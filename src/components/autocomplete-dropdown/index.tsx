import { Autocomplete, FormControl } from '@mui/material';
import { useId } from 'react';
import {
  handleAutocompleteChange,
  isOptionEqualToValue,
  renderInputHandler,
} from './index.utils';

interface I18N {
  label: string;
  categories: string[];
}

const initialStateI18n: I18N = {
  label: 'Categories',
  categories: ['Oro', 'Plata'],
};

interface DropdownProps {
  i18n?: Partial<I18N>;
  value: string;
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => void;
  filter?: (categories: string[]) => string[];
}

const AutocompleteDropdown: React.FC<DropdownProps> = ({
  i18n,
  value,
  onChange,
  filter,
}) => {
  const id = useId();
  const lang = i18n ? { ...initialStateI18n, ...i18n } : initialStateI18n;
  const filteredCategory = filter ? filter(lang.categories) : lang.categories;

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    handleAutocompleteChange(event, newValue, onChange);
  };

  const renderInput = renderInputHandler(lang.label);

  return (
    <FormControl fullWidth>
      <Autocomplete
        id={id}
        value={value}
        onChange={handleChange}
        options={filteredCategory}
        renderInput={renderInput}
        isOptionEqualToValue={isOptionEqualToValue}
        disableClearable
      />
    </FormControl>
  );
};

export default AutocompleteDropdown;
