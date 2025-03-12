import { Button, Typography } from "@mui/material";
import { useState } from "react";
import ModalInput from "../../components/modal-input";

interface ModalInputIndexProps {
    title: string;
}

const ModalInputIndex: React.FC<ModalInputIndexProps> = ({ title }) => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const creaAlgo = () => {
        sendData(mensaje)
    }
    return (
        <div>
            <Typography
                variant="h5"
                component="h1"
                gutterBottom
            >{title}</Typography>
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Nuevo Mensaje
            </Button>
            <ModalInput
                open={openModal}
                onClose={handleCloseModal}
            />
        </div>
    );
}

export default ModalInputIndex;