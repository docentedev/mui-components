import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useId } from 'react';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Item {
  id: string; // Asumiendo que cada opción tiene un id
  label: string; // Asumiendo que cada opción tiene un label
}

interface I18N {
  label: string;
  placeholder: string;
}

interface AutocompleteDropdownProps {
  options: Item[];
  value: string[] | string; // Puede ser un array o un string dependiendo de si es múltiple
  i18n?: I18N;
  onChange: (event: React.ChangeEvent<unknown>, value: string[] | string) => void;
  multiple?: boolean;
}

const AutocompleteDropdown: React.FC<AutocompleteDropdownProps> = ({ options, value, onChange, i18n, multiple = false }) => {
  const id = useId();

  const optionsMap = React.useMemo(() => {
    const map: Record<string, Item> = {};
    options.forEach(option => {
      map[option.id] = option;
    });
    return map;
  }, [options]);

  const name = (option: Item) => (option ? option.label : '');

  const handleOnChange = (event: React.ChangeEvent<unknown>, newValue: string[] | string) => {
    onChange(event, newValue);
  };

  return (
    <Autocomplete
      size="small"
      multiple
      id={`${id}-autocomplete-dropdown`}
      options={options.map(option => option.id)} // Usamos `id` para las opciones
      disableCloseOnSelect={multiple} // Sólo cerramos el dropdown si es de selección única
      value={multiple ? (value as string[]) : [value as string]} // Aseguramos que el valor sea un array
      onChange={handleOnChange}
      getOptionLabel={(option) => Array.isArray(option) ? option.map(opt => name(optionsMap[opt])).join(', ') : name(optionsMap[option])}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const item = optionsMap[option];
        return (
          <li key={key} {...optionProps}>
            {multiple ? (
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={(value as string[]).includes(option)} // Verificar si el id está en `value`
              />
            ) : null}
            {name(item)}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label={i18n?.label || ''} placeholder={i18n?.placeholder || ''} />
      )}
      renderTags={(value: string[], getTagProps) => {
        // Si no es múltiple, no mostrar chips, solo el valor seleccionado
        if (!multiple && value.length > 0) {
          const selectedOption = optionsMap[value[0]];
          return (
            <span {...getTagProps({ index: 0 })}>
              {name(selectedOption)}
            </span>
          );
        }
        return null; // No renderizamos chips si es una selección única
      }}
    />
  );
};

export default AutocompleteDropdown;