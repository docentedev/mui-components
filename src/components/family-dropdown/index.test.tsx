import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import FamilyDropdown from './index';

describe('FamilyDropdown', () => {
  const families = ['Oro', 'Plata'];

  test('should render the label correctly', () => {
    render(
      <FamilyDropdown
        i18n={{ label: 'Seleccionar Familia', families }}
        value=''
        onChange={() => {}}
      />
    );

    const selectInput = screen.getByRole('combobox', {
      name: 'Seleccionar Familia',
    });
    expect(selectInput).toBeInTheDocument();
  });

  test('should show options when clicked', async () => {
    render(
      <FamilyDropdown
        i18n={{ label: 'Seleccionar Familia', families }}
        value=''
        onChange={() => {}}
      />
    );

    const selectInput = screen.getByRole('combobox', {
      name: 'Seleccionar Familia',
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
        i18n={{ label: 'Seleccionar Familia', families }}
        value=''
        onChange={handleChange}
      />
    );

    const selectInput = screen.getByRole('combobox', {
      name: 'Seleccionar Familia',
    });

    await userEvent.click(selectInput);

    const option = await screen.findByText('Oro');
    await userEvent.click(option);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 'Oro');
    });
  });
});
