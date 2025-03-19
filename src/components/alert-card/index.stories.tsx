import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AlertCard from './index';

const meta = {
  title: 'components/AlertCard',
  component: AlertCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
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
} satisfies Meta<typeof AlertCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    i18n: {
      title: 'Pre Resolución',
      text: 'Esta Pre Resolución no posee contratos asociados',
    },
    severity: 'warning',
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
