import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useId } from 'react';

interface InputProps {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode;
    iconPosition?: 'start' | 'end';
    type?: 'text' | 'number' | 'password' | 'email' | 'search';
    id?: string;
    placeholder?: string;
    required?: boolean;
    size?: 'small' | 'medium';
    marginTop?: boolean;
}

const Input: React.FC<InputProps> = ({
    id: externalId,
    required,
    label,
    value,
    onChange,
    placeholder,
    marginTop,
    icon,
    iconPosition = 'start',
    type = 'text',
    size = 'small',
}) => {
    const id = useId();
    const startAdornment = type === 'search' ? (
        <InputAdornment position="start">
            <SearchIcon />
        </InputAdornment>
    ) : (
        icon && iconPosition === 'start' ? (
            <InputAdornment position="start">
                {icon}
            </InputAdornment>
        ) : null
    );

    const endAdornment = icon && iconPosition === 'end' ? (
        <InputAdornment position="end">
            {icon}
        </InputAdornment>
    ) : null;

    return (
        <FormControl fullWidth size={size} variant='outlined' sx={{ mt: marginTop ? 1 : 0 }}>
            <InputLabel
                htmlFor={externalId || id}
                required={required}
            >{label}</InputLabel>
            <OutlinedInput
                id={externalId || id}
                type={type}
                label={label}
                value={value}
                onChange={onChange}
                startAdornment={startAdornment}
                endAdornment={endAdornment}
                placeholder={placeholder}
            />
        </FormControl>
    );
}

export default Input;