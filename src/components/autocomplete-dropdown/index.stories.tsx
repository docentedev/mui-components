import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import AutocompleteDropdown from '.';

const meta = {
  title: 'components/AutoCompleteDropdown',
  component: AutocompleteDropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    filter: {
      control: 'text',
      description: 'Filter function',
    },
  },
} satisfies Meta<typeof AutocompleteDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

interface I18N {
  label: string;
  categories: string[];
}

const DropdownWithState = (args: {
  filter?: (categories: string[]) => string[];
  i18n: I18N;
}) => {
  const [selectedcategory, setSelectedcategory] = useState<string>('');

  const filter = args.filter
    ? args.filter(['Family A', 'Family B', 'Family C'])
    : ['Family A', 'Family B', 'Family C'];

  return (
    <div>
      <p>Selected Value: {selectedcategory}</p>

      <AutocompleteDropdown
        {...args}
        value={selectedcategory}
        i18n={{ label: args.i18n?.label || '', categories: filter }}
        onChange={(_event, value) => setSelectedcategory(value)}
      />
    </div>
  );
};

export const Component: Story = {
  render: (args) => <DropdownWithState {...args} i18n={args.i18n as I18N} />,
  args: {
    value: '',
    onChange: () => {},
    i18n: {
      label: 'Select Category',
      categories: ['Family A', 'Family B', 'Family C'],
    } as I18N,
    filter: (categories: string[]) =>
      categories.filter((categories) => categories.includes('Family')),
  },
};
