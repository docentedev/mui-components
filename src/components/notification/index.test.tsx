import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Notification from './index';

interface I18N {
  title: string;
  text: string;
}

const mockI18n: Partial<I18N> = {
  title: 'Success title',
  text: 'Success text',
};

describe('AlertCard Component', () => {
  test('should render when open', () => {
    render(
      <Notification
        open={true}
        i18n={mockI18n}
        severity='success'
        onClose={() => {}}
      />
    );

    expect(screen.getByText('Success title')).toBeInTheDocument();
    expect(screen.getByText('Success text')).toBeInTheDocument();
  });

  test('should call onClose when close button is clicked', () => {
    const onCloseMock = vi.fn();

    render(
      <Notification
        open={true}
        i18n={mockI18n}
        severity='success'
        onClose={onCloseMock}
      />
    );

    fireEvent.click(screen.getByRole('button'));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
