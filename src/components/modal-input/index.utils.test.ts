import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useMessage } from "./index.utils";

describe("useMessage hook", () => {
  test("debe inicializar con un mensaje vacío", () => {
    const { result } = renderHook(() => useMessage());
    expect(result.current.message).toBe("");
  });

  test("debe actualizar el mensaje cuando cambia el input", () => {
    const { result } = renderHook(() => useMessage());

    act(() => {
      result.current.handleMessageChange({
        target: { value: "Hola Mundo" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.message).toBe("Hola Mundo");
  });

  test("debe enviar el mensaje y limpiar el estado", () => {
    const onCloseMock = vi.fn();
    const { result } = renderHook(() => useMessage());

    // Simulamos un cambio en el mensaje
    act(() => {
      result.current.handleMessageChange({
        target: { value: "Mensaje de prueba" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.message).toBe("Mensaje de prueba");

    act(() => {
      result.current.handleSendMessage(onCloseMock);
    });

    expect(result.current.message).toBe(""); // El mensaje debe resetearse
    expect(onCloseMock).toHaveBeenCalled(); // La función onClose debe ejecutarse
  });

  test("debe mostrar un error si el mensaje está vacío al intentar enviarlo", () => {
    const { result } = renderHook(() => useMessage());

    act(() => {
      result.current.handleSendMessage(() => {});
    });

    expect(result.current.error).toBe("El mensaje no puede estar vacio");
  });

  test("debe mostrar un error si el mensaje es demasiado corto (menos de 5 caracteres) al intentar enviarlo", () => {
    const { result } = renderHook(() => useMessage());

    act(() => {
      result.current.handleMessageChange({
        target: { value: "Hola" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSendMessage(() => {});
    });

    expect(result.current.error).toBe(
      "El mensaje debe tener al menos 5 caracteres"
    );
  });

  test("no debe mostrar error si el mensaje tiene 5 o más caracteres al intentar enviarlo", () => {
    const { result } = renderHook(() => useMessage());

    act(() => {
      result.current.handleMessageChange({
        target: { value: "Mensaje válido" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSendMessage(() => {});
    });

    expect(result.current.error).toBe(""); 
  });
});
