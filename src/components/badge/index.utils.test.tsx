import { describe, expect, test, vi } from 'vitest';
import {
  getUnreadNotifications,
  Notification,
  useNotificationHandler,
} from './index.utils';
import { fireEvent, render } from '@testing-library/react';

const TestComponent = ({
  onNotificationClick,
}: {
  onNotificationClick: (id: number) => void;
}) => {
  const handler = useNotificationHandler(onNotificationClick);
  return <button onClick={handler(1)}>Click me</button>;
};

describe('getUnreadNotifications', () => {
  test('should return only unread notifications', () => {
    const notifications: Notification[] = [
      { id: 1, message: 'Message 1', read: false },
      { id: 2, message: 'Message 2', read: true },
      { id: 3, message: 'Message 3', read: false },
    ];

    const unreadNotifications = getUnreadNotifications(notifications);
    expect(unreadNotifications).toHaveLength(2);
    expect(unreadNotifications[0].id).toBe(1);
  });
});

describe('useNotificationHandler', () => {
  test('should return a function that calls onNotificationClick with the correct id', () => {
    const mockOnNotificationClick = vi.fn();

    const { getByText } = render(
      <TestComponent onNotificationClick={mockOnNotificationClick} />
    );

    const button = getByText('Click me');
    fireEvent.click(button);

    expect(mockOnNotificationClick).toHaveBeenCalledTimes(1);
    expect(mockOnNotificationClick).toHaveBeenCalledWith(1);
  });
});
