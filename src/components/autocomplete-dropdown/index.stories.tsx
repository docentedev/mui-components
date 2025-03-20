import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import AutocompleteDropdown from '.';
import { Divider, Typography } from '@mui/material';

// Configuración básica de Storybook
const meta: Meta<typeof AutocompleteDropdown> = {
  title: 'components/AutoCompleteDropdown',
  component: AutocompleteDropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Definición de tipos para los i18n
interface I18N {
  label: string;
  placeholder: string;
}

// Componente con estado para demostrar la funcionalidad
const DropdownWithState = (args: {
  i18n: I18N;
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const options = [
    { id: '01', label: 'Oro' },
    { id: '02', label: 'Plata' },
    { id: '03', label: 'Bronce' },
  ];

  return (
    <div>
      <Typography>
        Categorías seleccionadas: {selectedCategories.join(', ')}
      </Typography>
      <Divider sx={{ my: 1 }} />
      <AutocompleteDropdown
        {...args}
        value={selectedCategories}
        i18n={{ label: args.i18n.label, placeholder: args.i18n.placeholder }}
        onChange={(_event, value) => setSelectedCategories(value)}
        options={options}
      />
    </div>
  );
};

// Historia del componente
export const Component: Story = {
  render: (args) => <DropdownWithState {...args} i18n={args.i18n as I18N} />,
  args: {
    value: [],
    onChange: () => {},
    i18n: {
      label: 'Seleccionar Categorías',
      placeholder: 'Elige una o más categorías',
    },
    options: [],
  },
};
