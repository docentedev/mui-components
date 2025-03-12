import type { Meta, StoryObj } from '@storybook/react';
import { MaterialType } from './index';

const meta = {
  title: 'components/MaterialType',
  component: MaterialType,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    label: 'Material Type',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the MaterialType component',
    },
    size: {
      options: ['small', 'medium'],
      control: { type: 'select' },
      value: 'medium',
      description: 'Size of the MaterialType component',
    },
    material: {
      options: ['Gold', 'Silver', 'ExclusiveBrand', 'Collected'],
      control: { type: 'select' },
      value: 'Gold',
      description: 'Material type',
    },
  },
} satisfies Meta<typeof MaterialType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    size: 'medium',
    material: 'Gold',
  },
};
