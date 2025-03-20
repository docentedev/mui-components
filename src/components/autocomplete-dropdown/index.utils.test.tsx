import { describe, expect, test } from 'vitest';
import { AutocompleteRenderInputParams } from '@mui/material';
import { render, screen } from '@testing-library/react';
import {
  isOptionEqualToValue,
  renderInputHandler,
} from './index.utils';

describe('isOptionEqualToValue', () => {
  test('should return true if option equals value', () => {
    expect(isOptionEqualToValue('Oro', 'Oro')).toBe(true);
  });

  test('should return false if option does not equal value', () => {
    expect(isOptionEqualToValue('Oro', 'Plata')).toBe(false);
  });
});

describe('renderInputHandler', () => {
  test('should return a function that renders a TextField with the correct label', () => {
    const label = 'Categorías';
    const renderInput = renderInputHandler(label);

    const params: AutocompleteRenderInputParams = {
      id: 'autocomplete',
      disabled: false,
      fullWidth: true,
      size: 'small',
      InputLabelProps: {},
      InputProps: {
        ref: null,
        className: '',
        startAdornment: undefined,
        endAdornment: undefined,
        onMouseDown: function (): void {
          throw new Error('Function not implemented.');
        },
      },
      inputProps: { ref: null },
    };

    render(renderInput(params));

    const textField = screen.getByLabelText(label);
    expect(textField).toBeInTheDocument();
  });
});
