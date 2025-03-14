import type { Meta, StoryObj } from '@storybook/react';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

import Breadcrumb from './index';

const meta = {
  title: 'components/Breadcrumb',
  component: Breadcrumb,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  argTypes: {
    path: {
      control: 'object',
      description: 'Breadcrumb path',
    },
    buttonLabel: {
      control: 'text',
      description: 'Text for the action button',
      value: 'Agregar',
    },
    onButtonClick: {
      action: 'clicked',
      description: 'Triggered when the button is clicked',
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    path: [
      { label: 'Inicio', link: '/#', icon: <HomeIcon /> },
      { label: 'Configuración', icon: <SettingsIcon /> },
      { label: 'Tipo de Material' },
    ],
    buttonLabel: 'Agregar',
    onButtonClick: () => alert('Button clicked'),
  },
};
