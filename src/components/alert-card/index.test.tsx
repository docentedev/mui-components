import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AlertCard from './index';

interface I18N {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  label: string;
}

const mockI18n: Partial<I18N> = {
  type: 'success',
  title: 'Success title',
  label: 'Success label',
};

describe('AlertCard Component', () => {
  test('should render when open', () => {
    render(<AlertCard open={true} i18n={mockI18n} onClose={() => {}} />);

    expect(screen.getByText('Success title')).toBeInTheDocument();
    expect(screen.getByText('Success label')).toBeInTheDocument();
  });

  test('should call onClose when close button is clicked', () => {
    const onCloseMock = vi.fn();

    render(<AlertCard open={true} i18n={mockI18n} onClose={onCloseMock} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
