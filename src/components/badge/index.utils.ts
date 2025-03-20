import { useCallback } from 'react';

export interface Notification {
  id: number;
  message: string;
  read: boolean;
}

export const getUnreadNotifications = (
  notifications: Notification[]
): Notification[] => {
  return notifications.filter((n) => !n.read);
};

export const useNotificationHandler = (
  onNotificationClick: (id: number) => void
) => {
  return useCallback(
    (id: number) => () => onNotificationClick(id),
    [onNotificationClick]
  );
};
