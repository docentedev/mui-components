import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import ConfirmationModal from './index';

const mockI18n = {
  title: 'Modal Confirmation',
  text: 'text',
  success: 'Success',
  cancel: 'cancel',
};

describe('ModalInputIndex', () => {
  test('should render when open', () => {
    render(
      <ConfirmationModal
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
      <ConfirmationModal
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
