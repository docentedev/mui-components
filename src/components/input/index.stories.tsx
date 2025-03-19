import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Input from './index';

const meta = {
  title: 'components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Gramos (gr)',
    onChange: () => { },
    value: '',
  },
  argTypes: {
    value: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    label: 'Gramos (gr)',
    onChange: () => { },
    value: '',
    placeholder: 'Ingrese valor',
  },
  render: (args) => {
    const Component = () => {
      const [value, setValue] = useState(args.value);
      const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setValue(target.value);
      };
      return <Input label={args.label} value={value} onChange={handleChange} placeholder={args.placeholder} size={args.size} />
    };
    return <Component />;
  },
};
