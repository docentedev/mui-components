import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useMessage } from './index.utils';
import styles from './index.module.css';
import Input from '../input';

interface ModalInputIndexProps {
  open: boolean;
  onClose: () => void;
}

const ModalInputIndex: React.FC<ModalInputIndexProps> = ({ open, onClose }) => {
  const { message, error, handleMessageChange, handleSendMessage, clearError } = useMessage();

  const handleModalClose = () => {
    clearError();
    onClose();
  }

  return (
    <Dialog open={open} onClose={handleModalClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <div className={styles.header}>
          <div>Confirmacion de Envio</div>
          <IconButton onClick={handleModalClose} size="small">
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <Input
          marginTop
          label="Mensaje"
          value={message}
          size="medium"
          onChange={handleMessageChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose} variant="contained" color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={() => handleSendMessage(handleModalClose)}
          variant="contained"
          color="primary"
        >
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalInputIndex;
