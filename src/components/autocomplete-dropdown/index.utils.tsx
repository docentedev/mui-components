import { TextField } from '@mui/material';
import { Item } from '../dropdown';

export const isOptionEqualToValue = (option: Item, value: string) => {
  return option.value === value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderInputHandler = (label: string) => (params: any) => {
  return <TextField {...params} label={label} variant="outlined" />;
};