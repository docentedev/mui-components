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