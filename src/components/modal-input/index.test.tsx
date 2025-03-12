import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import ModalInputIndex from './index';

describe("ModalInputIndex", () => {
  test("should render when open", () => {
    render(
      <ModalInputIndex
        open={true}
        title="Envio de documentacion"
        label="Mensaje"
        succeedLabel="Enviar"
        cancelLabel="Cancelar"
        value=""
        onClose={() => {}}
        onChange={() => {}}
        onSucceed={() => {}}
      />
    );

    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Enviar")).toBeInTheDocument();
  });

  test("should close on cancel click", () => {
    const onCloseMock = vi.fn();

    render(
      <ModalInputIndex
        open={true}
        title="Envio de documentacion"
        label="Mensaje"
        succeedLabel="Enviar"
        cancelLabel="Cancelar"
        value=""
        onClose={onCloseMock}
        onChange={() => {}}
        onSucceed={() => {}}
      />
    );

    const cancelButton = screen.getByText("Cancelar");
    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
