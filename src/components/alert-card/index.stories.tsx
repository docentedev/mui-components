import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AlertCard from './index';

const meta = {
  title: 'components/alert-card',
  component: AlertCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    i18n: {
      title: 'Information',
      text: 'This is an informational alert.',
    },
    type: 'info',
    open: true,
    onClose: () => {},
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
    },
    open: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof AlertCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    i18n: {
      title: 'Information',
      text: 'Alert text',
    },
    type: 'info',
    open: true,
    onClose: () => {},
  },
  render: (args) => {
    const AlertStoryComponent = () => {
      const [open, setOpen] = useState(args.open);

      const handleClose = () => {
        setOpen(false);
      };

      return <AlertCard {...args} open={open} onClose={handleClose} />;
    };
    return <AlertStoryComponent />;
  },
};
