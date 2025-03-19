import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ModalConfirm from '.';

const meta = {
  title: 'components/ModalConfirm',
  component: ModalConfirm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    open: true,
    i18n: {
      title: 'Confirmacion',
      text: 'Let Google help apps determine location. This means sending anonymous',
      success: 'Success',
      cancel: 'Cancel',
    },
    onClose: () => {},
    onSuccess: () => {},
  },
  argTypes: {
    open: { control: 'boolean' },
  },
} satisfies Meta<typeof ModalConfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    open: true,
  },
  render: (args) => {
    const ModalStoryComponent = () => {
      const [open, setOpen] = useState(args.open);

      return (
        <ModalConfirm
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        />
      );
    };

    return <ModalStoryComponent />;
  },
};
