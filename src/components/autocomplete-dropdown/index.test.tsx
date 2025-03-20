import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import FamilyDropdown from './index';

describe('FamilyDropdown', () => {
  const categories = [{ value: 'Oro', label: 'Oro' }, { value: 'Plata', label: 'Plata' }];

  test('should render the label correctly', () => {
    render(
      <FamilyDropdown
        i18n={{ label: 'Seleccionar Categoria' }}
        value=''
        onChange={() => { }}
        options={categories}
      />
    );

    const selectInput = screen.getByRole('combobox', {
      name: 'Seleccionar Categoria',
    });
    expect(selectInput).toBeInTheDocument();
  });

  test('should show options when clicked', async () => {
    render(
      <FamilyDropdown
        i18n={{ label: 'Seleccionar Categoria' }}
        value=''
        onChange={() => { }}
        options={categories}
      />
    );

    const selectInput = screen.getByRole('combobox', {
      name: 'Seleccionar Categoria',
    });

    await userEvent.click(selectInput);

    await waitFor(() => {
      expect(screen.getByText('Oro')).toBeInTheDocument();
      expect(screen.getByText('Plata')).toBeInTheDocument();
    });
  });

  test('should select an option and update the value', async () => {
    const handleChange = vi.fn();

    render(
      <FamilyDropdown
        i18n={{ label: 'Seleccionar Categoria' }}
        value=''
        onChange={handleChange}
        options={categories}
      />
    );

    const selectInput = screen.getByRole('combobox', {
      name: 'Seleccionar Categoria',
    });

    await userEvent.click(selectInput);

    const option = await screen.findByText('Oro');
    await userEvent.click(option);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 'Oro');
    });
  });
});
