import { Box, Button, Divider, Modal, Paper, TextField, Typography,} from "@mui/material";
import { useMessage } from "./index.utils";
import styles from "./index.module.css";
import CloseIcon from "@mui/icons-material/Close";

interface ModalInputIndexProps {
  open: boolean;
  onClose: () => void;
}

const ModalInputIndex: React.FC<ModalInputIndexProps> = ({ open, onClose }) => {
  const { message, error ,handleMessageChange, handleSendMessage, clearError  } = useMessage();

  const handleModalClose = () => {
    clearError();
    onClose();
  }

  return (
    <Modal open={open} onClose={handleModalClose} className={styles.modal}>
      <Paper className={styles.paper}>
        <Box className={styles.boxTitle}>
          <Typography variant="h5">Confirmacion de Envio</Typography>
          <CloseIcon onClick={handleModalClose} className={styles.closeIcon} />
          <Divider />
        </Box>

        <Box className={styles.container}>
          <Box className={styles.box}>
            <Typography variant="h6">Confirmacion</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography>¿Estas segro que deseas enviar el mensaje?</Typography>
          </Box>

          <Box className={styles.input}>
            <TextField
              id="outlined-basic"
              label="Mensaje"
              variant="outlined"
              value={message}
              onChange={handleMessageChange}
              error={!!error}
              helperText={error}
            />
          </Box>

          <Box className={styles.buttonContainer}>
            <Button onClick={handleModalClose} variant="contained" color="error">
              Cancelar
            </Button>
            <Button
              onClick={() => handleSendMessage(handleModalClose)}
              variant="contained"
              color="info"
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ModalInputIndex;
