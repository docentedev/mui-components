import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './index.module.css';
import Input from '../input';

interface ModalInputIndexProps {
  open: boolean;
  title: string;
  label: string;
  succeedLabel: string;
  cancelLabel: string;
  value: string;
  onClose: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSucceed: () => void;
}

const ModalInputIndex: React.FC<ModalInputIndexProps> = ({
  open,
  title,
  label,
  succeedLabel,
  cancelLabel, 
  value,
  onClose,
  onChange,
  onSucceed
}) => {

  const handleModalClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleModalClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div className={styles.header}>
          <div>{title}</div>
          <IconButton onClick={handleModalClose} size="small">
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <Input
          marginTop
          label={label}
          value={value}
          size="medium"
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleModalClose}
          variant="contained"
          color="secondary"
        >
          {cancelLabel}
        </Button>
        <Button
          onClick={onSucceed}
          variant="contained"
          color="primary"
        >
          {succeedLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalInputIndex;
