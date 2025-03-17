import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface DropdownProps {
  label: string;
  families: string[];
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  filterFamilies?: (families: string[]) => string[];
}

const FamilyDropdown: React.FC<DropdownProps> = ({
  label,
  families,
  value,
  onChange,
  filterFamilies,
}) => {
  const filteredFamilies = filterFamilies ? filterFamilies(families) : families;

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange}>
        {filteredFamilies.map((family) => (
          <MenuItem key={family} value={family}>
            {family}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FamilyDropdown;
