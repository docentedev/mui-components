import { IconButton, ListItemText, Menu, MenuItem, Stack } from '@mui/material';
import Badge from '@mui/material/Badge';
import {
  getUnreadNotifications,
  Notification,
  useNotificationHandler,
} from './index.utils';

interface BadgeIndexProps {
  icon: React.ReactNode;
  notifications: Notification[];
  open: boolean;
  anchorEl: null | HTMLElement;
  onClose: () => void;
  onNotificationClick: (id: number) => void;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  emptyMessage?: string;
}

const BadgeComponent: React.FC<BadgeIndexProps> = ({
  icon,
  notifications,
  open,
  anchorEl,
  onNotificationClick,
  onClose,
  onClick,
  emptyMessage = 'No hay notificaciones',
}) => {
  const unreadNotifications = getUnreadNotifications(notifications);
  const handleClick = useNotificationHandler(onNotificationClick);

  return (
    <Stack>
      <IconButton onClick={onClick}>
        <Badge badgeContent={unreadNotifications.length} color='error'>
          {icon}
        </Badge>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
        {unreadNotifications.length > 0 ? (
          unreadNotifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={handleClick(notification.id)}
            >
              <ListItemText primary={notification.message} />
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>{emptyMessage}</MenuItem>
        )}
      </Menu>
    </Stack>
  );
};

export default BadgeComponent;
