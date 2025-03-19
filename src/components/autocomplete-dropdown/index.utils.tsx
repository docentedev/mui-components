import { AutocompleteRenderInputParams, TextField } from '@mui/material';

export const handleAutocompleteChange = (
  event: React.SyntheticEvent<Element, Event>,
  newValue: string,
  onChange: (event: React.SyntheticEvent<Element, Event>, value: string) => void
) => {
  onChange(event, newValue);
};

export const isOptionEqualToValue = (option: string, value: string) => {
  return option === value;
};

export const renderInputHandler = (label: string) => {
  return (params: AutocompleteRenderInputParams) => (
    <TextField {...params} label={label} />
  );
};
