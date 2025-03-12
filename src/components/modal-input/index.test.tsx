import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import ModalInputIndex from './index';

const mockI18n = {
  title: 'Modal input',
  label: 'Label',
  success : 'Success',
  cancel: 'cancel',
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

    expect(screen.getByText('cancel')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
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

    const cancelButton = screen.getByText('cancel');
    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
