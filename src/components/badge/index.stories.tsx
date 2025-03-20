import { Meta, StoryObj } from '@storybook/react';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from 'react';
import BadgeComponent from './index';

const meta: Meta<typeof BadgeComponent> = {
  title: 'components/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BadgeComponent>;

export default meta;

type Story = StoryObj<typeof BadgeComponent>;

export const Default: Story = {
  args: {
    icon: <MailIcon />,
    notifications: [
      { id: 1, message: 'Nueva actualización disponible', read: false },
      { id: 2, message: 'Nueva actualización disponible2', read: false },
      { id: 3, message: 'Tu pedido ha sido enviado', read: true },
      { id: 4, message: 'Tienes un nuevo mensaje', read: false },
    ],
    onNotificationClick: (id: number) => {
      console.log(`test ${id} marcada`);
    },
  },
  render: (args) => <BadgeWithState {...args} />,
};

const BadgeWithState: React.FC<typeof Default.args> = (
  args = Default.args || {}
) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(args.notifications || []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleNotificationClick = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    if (args.onNotificationClick) {
      args.onNotificationClick(id);
    }
  };

  return (
    <BadgeComponent
      {...args}
      icon={args.icon}
      notifications={notifications}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClick}
      onNotificationClick={handleNotificationClick}
    />
  );
};
