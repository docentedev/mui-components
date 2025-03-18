import { Autocomplete, FormControl, TextField } from '@mui/material';

interface I18N {
  label: string;
  families: string[];
}

const initialStateI18n: I18N = {
  label: 'Family',
  families: ['Oro', 'Plata'],
};

interface DropdownProps {
  i18n?: Partial<I18N>;
  value: string;
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => void;
  filterFamilies?: (families: string[]) => string[];
}

const FamilyDropdown: React.FC<DropdownProps> = ({
  i18n,
  value,
  onChange,
  filterFamilies,
}) => {
  const lang = i18n ? { ...initialStateI18n, ...i18n } : initialStateI18n;
  const filteredFamilies = filterFamilies
    ? filterFamilies(lang.families)
    : lang.families;

  return (
    <FormControl fullWidth>
      <Autocomplete
        id='dropdown-id'
        value={value}
        onChange={(event, value) => onChange(event, value)}
        options={filteredFamilies}
        renderInput={(params) => <TextField {...params} label={lang.label} />}
        isOptionEqualToValue={(option, value) => option === value}
        disableClearable
      />
    </FormControl>
  );
};

export default FamilyDropdown;
