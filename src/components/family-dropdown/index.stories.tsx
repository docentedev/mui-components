import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import FamilyDropdown from '.';

const meta = {
  title: 'components/FamilyDropdown',
  component: FamilyDropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    filterFamilies: {
      control: 'text',
      description: 'Filter function',
    },
  },
} satisfies Meta<typeof FamilyDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const FamilyDropdownWithState = (args: {
  label: string;
  filterFamilies?: (families: string[]) => string[];
}) => {
  const [selectedFamily, setSelectedFamily] = useState('');

  const filteredFamilies = args.filterFamilies
    ? args.filterFamilies(['Family A', 'Family B', 'Family C'])
    : ['Family A', 'Family B', 'Family C'];

  return (
    <FamilyDropdown
      {...args}
      value={selectedFamily}
      families={filteredFamilies}
      onChange={(event) => setSelectedFamily(event.target.value)}
    />
  );
};

export const Component: Story = {
  render: (args) => <FamilyDropdownWithState {...args} />,
  args: {
    label: 'Seleccionar Familia',
    families: ['Family A', 'Family B', 'Family C'],
    value: '',
    onChange: () => {},
    filterFamilies: (families: string[]) =>
      families.filter((family) => family.includes('B')),
  },
};
