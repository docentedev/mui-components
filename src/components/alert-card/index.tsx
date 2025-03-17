import { Alert, AlertTitle, Collapse } from '@mui/material';

interface I18N {
  title: string;
  text: string;
}

const initialState18N: I18N = {
  title: 'Title',
  text: 'Text',
};

interface alertCardIndexProps {
  i18n?: Partial<I18N>;
  type: 'error' | 'warning' | 'info' | 'success';
  open: boolean;
  onClose: () => void;
}

const AlertCard: React.FC<alertCardIndexProps> = ({ i18n, type, open, onClose }) => {
  const lang = i18n ? { ...initialState18N, ...i18n } : initialState18N;

  return (
    <Collapse in={open}>
      <Alert severity={type} onClose={onClose}>
        <AlertTitle>{lang.title}</AlertTitle>
        {lang.text}
      </Alert>
    </Collapse>
  );
};

export default AlertCard;
