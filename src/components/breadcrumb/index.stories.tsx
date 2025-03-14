import { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from './index';
import { MenuItem, Select } from '@mui/material';

const meta = {
  title: 'components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Breadcrumb items',
    },
    action: {
      action: 'text',
      description: 'Custom action element',
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    items: [
      { label: 'Inicio', link: '/#'},
      { label: 'Configuración', link: '/#'},
      { label: 'Tipo de Material' },
    ],
    action: (
      <Select defaultValue="" displayEmpty>
        <MenuItem value="" disabled>
          Agregar
        </MenuItem>
        <MenuItem value="1">Opción 1</MenuItem>
        <MenuItem value="2">Opción 2</MenuItem>
      </Select>
    ),
  },
};
