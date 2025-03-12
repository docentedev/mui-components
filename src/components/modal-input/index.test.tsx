import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import ModalInputIndex from './index';

const mockI18n = {
  title: 'Envío de documentación',
  label: 'Mensaje',
  succeesLabel: 'Enviar',
  cancelLabel: 'Cancelar'
};

describe('ModalInputIndex', () => {
  test('should render when open', () => {
    render(
      <ModalInputIndex
        open
        value=''
        onClose={() => {}}
        onChange={() => {}}
        onSuccess={() => {}}
        i18n={mockI18n}
      />
    );

    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Enviar')).toBeInTheDocument();
  });

  test('should close on cancel click', () => {
    const onCloseMock = vi.fn();

    render(
      <ModalInputIndex
        open
        value=''
        onClose={onCloseMock}
        onChange={() => {}}
        onSuccess={() => {}}
        i18n={mockI18n}
      />
    );

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
