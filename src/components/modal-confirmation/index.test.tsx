import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import ModalConfirm from './index';

const mockI18n = {
  title: 'Modal Confirm',
  text: 'text',
  success: 'Success',
  cancel: 'cancel',
};

describe('ModalConfirmIndex', () => {
  test('should render when open', () => {
    render(
      <ModalConfirm
        open
        onClose={() => {}}
        onSuccess={() => {}}
        i18n={mockI18n}
      />
    );

    expect(screen.getByText('cancel')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  test('should close on cancel click', () => {
    const onCloseMock = vi.fn();

    render(
      <ModalConfirm
        open
        onClose={onCloseMock}
        onSuccess={() => {}}
        i18n={mockI18n}
      />
    );

    const cancelButton = screen.getByText('cancel');
    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
