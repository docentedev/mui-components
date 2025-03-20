import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Dropdown, { Item } from './index';
import ButtonClear from '../button-clear';

const meta = {
    title: 'components/Dropdown',
    component: Dropdown,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    args: {
        onChange: (item?: Item) => console.log(item),
        label: 'Select an option',
        options: [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
        ],
        value: undefined,
    },
    argTypes: {
        label: {
            control: 'text',
            description: 'Label for the Dropdown component',
        },
        options: {
            control: 'object',
            description: 'Options for the Dropdown component',
        },
        value: {
            control: 'object',
            description: 'Selected value for the Dropdown component',
        },
        onChange: { action: 'changed', type: { name: 'function', required: false } },
    },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: [
        (Story, context) => {
            const [value, setValue] = useState<Item | undefined>(context.args.value);

            const handleChange = (item: Item | undefined) => {
                setValue(item);
                context.args.onChange(item);
            };

            const handleReset = () => {
                setValue(undefined);
                context.args.onChange(undefined);
            };

            return (
                <div style={{ display: 'flex', gap: '1rem', width: '18rem' }}>
                    <Story args={{ ...context.args, value, onChange: handleChange }} />
                    <ButtonClear label="Clear" onClick={handleReset} />
                </div>
            );
        }
    ],
    args: {
        label: 'Select an option',
        options: [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
        ],
        value: undefined,
    },
};
