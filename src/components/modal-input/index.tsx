import { Box, Button, Divider, Modal, Paper, TextField, Typography,} from "@mui/material";
import { useMessage } from "./index.utils";
import styles from "./index.module.css";
import CloseIcon from "@mui/icons-material/Close";

interface ModalInputIndexProps {
  open: boolean;
  onClose: () => void;
}

const ModalInputIndex: React.FC<ModalInputIndexProps> = ({ open, onClose }) => {
  const { message, handleMessageChange, handleSendMessage } = useMessage();

  return (
    <Modal open={open} onClose={onClose} className={styles.modal}>
      <Paper className={styles.paper}>
        <Box className={styles.boxTitle}>
          <Typography variant="h5">Confirmacion de Envio</Typography>
          <CloseIcon onClick={onClose} className={styles.closeIcon} />
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
            />
          </Box>

          <Box className={styles.buttonContainer}>
            <Button onClick={onClose} variant="contained" color="error">
              Cancelar
            </Button>
            <Button
              onClick={() => handleSendMessage(onClose)}
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
