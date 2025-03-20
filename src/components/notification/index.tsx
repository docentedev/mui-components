import {
  Alert,
  AlertColor,
  AlertTitle,
  Snackbar,
  SnackbarOrigin,
} from '@mui/material';

interface I18N {
  title: string;
  text: string;
}

const initialState18N: I18N = {
  title: 'Title',
  text: 'Text',
};

interface notificationIndexProps {
  i18n?: Partial<I18N>;
  severity: AlertColor;
  open: boolean;
  onClose: () => void;
  anchorOrigin?: SnackbarOrigin;
}

const Notification: React.FC<notificationIndexProps> = ({
  i18n,
  severity,
  open,
  onClose,
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
}) => {
  const lang = i18n ? { ...initialState18N, ...i18n } : initialState18N;

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={3000}
      anchorOrigin={anchorOrigin}
    >
      <Alert severity={severity} onClose={onClose}>
        <AlertTitle>{lang.title}</AlertTitle>
        {lang.text}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
