import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import ModalInput from '../../components/modal-input';

interface ModalInputIndexProps {
  title: string;
}

const ModalInputIndex: React.FC<ModalInputIndexProps> = ({ title }) => {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setValue('');
    setOpenModal(false);
  };

  const handleSucceed = () => {
    setMessage(value);
    setValue('');
    handleCloseModal();
  };

  return (
    <div>
      <Typography variant="h5" component="h1" gutterBottom>
        {title}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Nuevo Mensaje
      </Button>
      <ModalInput
        open={openModal}
        onClose={handleCloseModal}
        title="Envio de documentacion"
        label="Mensaje"
        value={value}
        onChange={handleChange}
        onSucceed={handleSucceed}
        cancelLabel="Cancelar"
        succeedLabel="Enviar"
      />

      <Typography>
        {message && `Mensaje enviado: ${message}`}
      </Typography>
    </div>
  );
};

export default ModalInputIndex;
