import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import ModalInput from '../../components/modal-input';
import Modal from '../../components/modal';

interface ModalInputIndexProps {
  title: string;
}

const ModalInputIndex: React.FC<ModalInputIndexProps> = ({ title }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openInvetory, setOpenInventory] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setValue('');
    setOpen(false);
  };

  const handleSucceed = () => {
    setMessage(value);
    setValue('');
    handleClose();
  };

  return (
    <div>
      <Typography variant="h5" component="h1" gutterBottom>
        {title}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Nuevo Mensaje
      </Button>
      <ModalInput
        open={open}
        onClose={handleClose}
        value={value}
        onChange={handleChange}
        onSuccess={handleSucceed}
      />

      <Button variant="contained" color="primary" onClick={() => setOpenConfirm(true)}>
        Envio de Pre Resolución
      </Button>

      <Modal
        onClose={() => setOpenConfirm(false)}
        onSuccess={() => setMessage('Confirmado')}
        open={openConfirm}
        i18n={{
          title: 'Envio de Pre Resolución',
          description: '¿Esta seguro que desea enviar la Pre Resolución?',
          success: 'Enviar',
          cancel: 'No enviar',
        }}
      />

      <Button variant="contained" color="primary" onClick={() => setOpenInventory(true)}>
        Inventario
      </Button>

      <Modal
        onClose={() => setOpenInventory(false)}
        onSuccess={() => setMessage('Inventario confirmado')}
        open={openInvetory}
        i18n={{
          title: 'Inventario',
          description: '¿Esta seguro que desea confirmar el inventario?',
          success: 'Confirmar',
          cancel: 'Cancelar',
        }}
      />

      <Typography>
        {message && `Mensaje enviado: ${message}`}
      </Typography>
    </div>
  );
};

export default ModalInputIndex;
