import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import ModalInput from '../../components/modal-input';

interface ModalInputIndexProps {
  title: string;
}

const ModalInputIndex: React.FC<ModalInputIndexProps> = ({ title }) => {
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

      <Typography>
        {message && `Mensaje enviado: ${message}`}
      </Typography>
    </div>
  );
};

export default ModalInputIndex;
