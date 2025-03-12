import { Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

interface ButtonClearProps {
    onClick: () => void;
    label: string;
    disabled?: boolean;
}


const ButtonClear: React.FC<ButtonClearProps> = ({ onClick, label, disabled }) => {
    return <Button
        variant="contained"
        color="primary"
        startIcon={<ClearIcon />}
        onClick={onClick}
        disabled={disabled}
    >{label}</Button>;
}

export default ButtonClear;
