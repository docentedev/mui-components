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

interface I18N {
  title: string;
  label: string;
  success: string;
  cancel: string;
}

const initialStateI18n: I18N = {
  title: 'Modal input',
  label: 'Label',
  success : 'Success',
  cancel: 'cancel',
};

interface ModalInputIndexProps {
  open: boolean;
  value: string;
  onClose: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSuccess: () => void;
  i18n?: Partial<I18N>;
}

const ModalInput: React.FC<ModalInputIndexProps> = ({
  open,
  value,
  onClose,
  onChange,
  onSuccess,
  i18n,
}) => {
  const lang = { ...initialStateI18n, ...i18n };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div className={styles.header}>
          <div>{lang.title}</div>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <Input
          marginTop
          label={lang.label}
          value={value}
          size="medium"
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="secondary">
          {lang.cancel}
        </Button>
        <Button onClick={onSuccess} variant="contained" color="primary">
          {lang.success}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalInput;
