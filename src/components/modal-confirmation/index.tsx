import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './index.module.css';

interface I18N {
  title: string;
  text: string;
  success: string;
  cancel: string;
}

const initialStateI18n: I18N = {
  title: 'Modal input',
  text: 'Label',
  success: 'Success',
  cancel: 'Cancel',
};

interface ModalInputIndexProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  i18n?: Partial<I18N>;
}

const ConfirmationModal: React.FC<ModalInputIndexProps> = ({
  open,
  onClose,
  onSuccess,
  i18n,
}) => {
  const lang = i18n ? { ...initialStateI18n, ...i18n } : initialStateI18n;

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        <div className={styles.header}>
          <div>{lang.title}</div>
          <IconButton onClick={onClose} size='small'>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{lang.text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='contained' color='secondary'>
          {lang.cancel}
        </Button>
        <Button onClick={onSuccess} variant='contained' color='primary'>
          {lang.success}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
