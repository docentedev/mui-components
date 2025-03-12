import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useId } from "react";

type Item = {
    value: string;
    label: string;
};

interface DropdownProps {
    value?: Item;
    onChange: (item: Item) => void;
    options: Item[];
    label: string;
}

const Dropdown: React.FC<DropdownProps> = ({ value, onChange, options, label }) => {
    const id = useId();
    const handleChange = (event: SelectChangeEvent) => {
        onChange(options.find((option) => option.value === event.target.value) as Item);
    };
    return (
        <FormControl fullWidth size="small" variant="outlined">
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                labelId={id}
                id={`select-${id}`}
                value={value?.value}
                label={label}
                onChange={handleChange}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default Dropdown;