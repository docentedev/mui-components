import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Notification from './index';

const meta = {
  title: 'components/Notification',
  component: Notification,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    i18n: {
      title: 'Pre Resolución',
      text: 'Esta Pre Resolución no posee contratos asociados',
    },
    severity: 'warning',
    open: true,
    onClose: () => {},
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
    },
    open: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    i18n: {
      title: 'Exito!',
      text: 'Se ha enviado correctamente',
    },
    severity: 'success',
    open: true,
    onClose: () => {},
  },
  render: (args) => {
    const AlertStoryComponent = () => {
      const [open, setOpen] = useState(args.open);

      const handleClose = () => {
        setOpen(false);
      };

      return <Notification {...args} open={open} onClose={handleClose} />;
    };
    return <AlertStoryComponent />;
  },
};
