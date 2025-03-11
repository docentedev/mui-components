import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ModalInputIndex from "./index";

describe("ModalInputIndex", () => {
  test("debe renderizarse correctamente cuando está abierto", () => {
    render(<ModalInputIndex open={true} onClose={() => {}} />);

    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Enviar")).toBeInTheDocument();
  });

  test("debe cerrar el modal al hacer clic en el botón 'Cancelar'", () => {
    const onCloseMock = vi.fn();
    render(<ModalInputIndex open={true} onClose={onCloseMock} />);

    const cancelButton = screen.getByText("Cancelar");
    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalled();
  });

  test("debe actualizar el mensaje cuando el usuario escribe en el input", () => {
    render(<ModalInputIndex open={true} onClose={() => {}} />);

    const input = screen.getByLabelText("Mensaje");
    fireEvent.change(input, { target: { value: "Hola Vitest" } });

    expect(input).toHaveValue("Hola Vitest");
  });

  test("debe mostrar un error si el mensaje está vacío y el usuario hace clic en 'Enviar'", () => {
    render(<ModalInputIndex open={true} onClose={() => {}} />);

    const sendButton = screen.getByText("Enviar");
    fireEvent.click(sendButton);

    expect(screen.getByText("El mensaje no puede estar vacio")).toBeInTheDocument();
  });

  test("debe mostrar un error si el mensaje tiene menos de 5 palabras y el usuario hace clic en 'Enviar'", () => {
    render(<ModalInputIndex open={true} onClose={() => {}} />);
  
    const sendButton = screen.getByText("Enviar");
    
    const input = screen.getByLabelText("Mensaje");
    fireEvent.change(input, { target: { value: "Hola" } });
  
    fireEvent.click(sendButton);
  
    expect(screen.getByText("El mensaje debe tener al menos 5 caracteres")).toBeInTheDocument();
  });

  test("debe limpiar el mensaje y el error al enviar correctamente", () => {
    const onCloseMock = vi.fn();
    render(<ModalInputIndex open={true} onClose={onCloseMock} />);

    const input = screen.getByLabelText("Mensaje");
    fireEvent.change(input, { target: { value: "Hola Vitest" } });

    const sendButton = screen.getByText("Enviar");
    fireEvent.click(sendButton);

    expect(onCloseMock).toHaveBeenCalled();
    expect(input).toHaveValue("");
    expect(screen.queryByText("El mensaje no puede estar vacío")).not.toBeInTheDocument();
  });
});
