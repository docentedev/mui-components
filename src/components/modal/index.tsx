import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './index.module.css';

interface I18N {
  title: string;
  description: string;
  success: string;
  cancel: string;
}

const initialStateI18n: I18N = {
  title: 'Modal input',
  description: 'Please input your value',
  success: 'Success',
  cancel: 'Cancel',
};

interface ModalIndexProps {
  open: boolean;
  onSuccess: () => void;
  onClose: () => void;
  i18n?: Partial<I18N>;
}

const Modal: React.FC<ModalIndexProps> = ({
  open,
  onClose,
  onSuccess,
  i18n,
}) => {
  const lang = i18n ? { ...initialStateI18n, ...i18n } : initialStateI18n;

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
        <DialogContentText>
          <Typography>{lang.description}</Typography>
        </DialogContentText>
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

export default Modal;
