import { describe, expect, test, vi } from 'vitest';
import BadgeComponent from './index';
import { fireEvent, render, screen } from '@testing-library/react';

describe('BadgeComponent', () => {
  const mockOnClick = vi.fn();
  const mockOnClose = vi.fn();
  const mockOnNotificationClick = vi.fn();

  const notifications = [
    { id: 1, message: 'Notification 1', read: false },
    { id: 2, message: 'Notification 2', read: false },
  ];

  test('renders the correct number of unread notifications', () => {
    render(
      <BadgeComponent
        icon={<span>🔔</span>}
        notifications={notifications}
        open={false}
        anchorEl={null}
        onClick={mockOnClick}
        onClose={mockOnClose}
        onNotificationClick={mockOnNotificationClick}
      />
    );

    const badge = screen.getByText('2');
    expect(badge).toBeInTheDocument();
  });

  test('opens the menu when icon button is clicked', () => {
    render(
      <BadgeComponent
        icon={<span>🔔</span>}
        notifications={notifications}
        open={false}
        anchorEl={null}
        onClick={mockOnClick}
        onClose={mockOnClose}
        onNotificationClick={mockOnNotificationClick}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('renders notification list when menu is open', () => {
    render(
      <BadgeComponent
        icon={<span>🔔</span>}
        notifications={notifications}
        open={true}
        anchorEl={document.createElement('div')}
        onClick={mockOnClick}
        onClose={mockOnClose}
        onNotificationClick={mockOnNotificationClick}
      />
    );

    expect(screen.getByText('Notification 1')).toBeInTheDocument();
    expect(screen.getByText('Notification 2')).toBeInTheDocument();
  });

  test('calls onNotificationClick with correct ID when a notification is clicked', () => {
    render(
      <BadgeComponent
        icon={<span>🔔</span>}
        notifications={notifications}
        open={true}
        anchorEl={document.createElement('div')}
        onClick={mockOnClick}
        onClose={mockOnClose}
        onNotificationClick={mockOnNotificationClick}
      />
    );

    const notificationItem = screen.getByText('Notification 1');
    fireEvent.click(notificationItem);

    expect(mockOnNotificationClick).toHaveBeenCalledTimes(1);
    expect(mockOnNotificationClick).toHaveBeenCalledWith(1);
  });

  test('displays empty message when there are no unread notifications', () => {
    render(
      <BadgeComponent
        icon={<span>🔔</span>}
        notifications={[]}
        open={true}
        anchorEl={document.createElement('div')}
        onClick={mockOnClick}
        onClose={mockOnClose}
        onNotificationClick={mockOnNotificationClick}
      />
    );

    expect(screen.getByText('No hay notificaciones')).toBeInTheDocument();
  });
});
