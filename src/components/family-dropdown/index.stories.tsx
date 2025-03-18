import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import FamilyDropdown from ".";

const meta = {
  title: "components/FamilyDropdown",
  component: FamilyDropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    filterFamilies: {
      control: "text",
      description: "Filter function",
    },
  },
} satisfies Meta<typeof FamilyDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

interface I18N {
  label: string;
  families: string[];
}

const FamilyDropdownWithState = (args: {
  filterFamilies?: (families: string[]) => string[];
  i18n: I18N;
}) => {
  const [selectedFamily, setSelectedFamily] = useState<string>("");

  const filteredFamilies = args.filterFamilies
    ? args.filterFamilies(["Family A", "Family B", "Family C"])
    : ["Family A", "Family B", "Family C"];

  return (
    <div>
      <p>Selected Value: {selectedFamily}</p>
      
      <FamilyDropdown
        {...args}
        value={selectedFamily}
        i18n={{ label: args.i18n?.label || "", families: filteredFamilies }}
        onChange={(_event, value) => setSelectedFamily(value)} 
      />
    </div>
  );
};

export const Component: Story = {
  render: (args) => (
    <FamilyDropdownWithState {...args} i18n={args.i18n as I18N} />
  ),
  args: {
    value: "",
    onChange: () => {}, 
    i18n: {
      label: "Seleccionar Familia",
      families: ["Family A", "Family B", "Family C"],
    } as I18N,
    filterFamilies: (families: string[]) =>
      families.filter((family) => family.includes("Family")),
  },
};
