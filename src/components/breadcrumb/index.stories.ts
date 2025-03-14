import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from './index'

const meta = {
    title: 'components/Breadcrumb',
    component: Breadcrumb,
} satisfies Meta<typeof Breadcrumb>

export default meta;
type Story = StoryObj<typeof meta>;

export const Component: Story = {
    args: {
        path: [
            { label: 'Inicio', link: '/' },
            { label: 'Configuración', link: '/' },
            { label: 'Tipo de Material' },
          ],
    }
}

