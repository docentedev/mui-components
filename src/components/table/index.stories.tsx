import { Meta, StoryObj } from '@storybook/react';
import Table from './index';
import { Button, Stack } from '@mui/material';
import { RemoveCircle } from '@mui/icons-material';

const meta = {
  title: 'components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {},
  argTypes: {
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
  args: {
    columns: [{
      label: 'Id',
      id: 'id',
    }, {
      label: 'Inversión',
      id: 'investment',
    }, {
      label: 'Sucursal',
      id: 'branch',
    }, {
      label: 'Acciones',
      align: 'center',
      render: () => (
        <Stack direction="row" gap={0.5}>
          <Button size="small" variant="contained">Ver</Button>
          <Button size="small" variant="text">Editar</Button>
          <Button size="small" variant="text" color="error" startIcon={<RemoveCircle />}>Eliminar</Button>
        </Stack>
      ),
    }],
    rows: [
      { id: 121443131, investment: 'Inversión X', branch: 'Sucursal 01' },
      { id: 234213464, investment: 'Inversión X', branch: 'Sucursal 01' },
      { id: 979774564, investment: 'Inversión X', branch: 'Sucursal 01' },
      { id: 635222342, investment: 'Inversión X', branch: 'Sucursal 01' },
      { id: 355444345, investment: 'Inversión X', branch: 'Sucursal 01' },
      { id: 676787577, investment: 'Inversión X', branch: 'Sucursal 01' },
      { id: 568456442, investment: 'Inversión X', branch: 'Sucursal 01' },
    ],
  },
  render: (args) => {
    const Component = () => {
      return <Table {...args} />;
    };
    return <Component />;
  },
};
