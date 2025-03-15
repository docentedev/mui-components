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
      type: 'info',
      title: 'Information',
      label: 'This is an informational alert.',
    },
    open: true,
    onClose: () => {},
  },
} satisfies Meta<typeof AlertCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    i18n: {
      type: 'info',
      title: 'Information',
      label: 'Alert label',
    },
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
