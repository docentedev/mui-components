import { Button, Card, CardContent, CardHeader, Divider, Stack, Typography } from '@mui/material';
import { MaterialType } from '../../components/material-type';
import Table from '../../components/table';
import { Material } from '../../components/material-type/types';
import ModalInputIndex from '../../components/modal-input';
import { useState } from 'react';

interface MaterialTypeIndexProps {
    title: string;
}



const MaterialTypeIndex: React.FC<MaterialTypeIndexProps> = ({ title }) => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            <Typography
                variant="h5"
                component="h1"
                gutterBottom
            >{title}</Typography>
            <Card>
                <CardHeader title={
                    <MaterialType material="Gold" size="medium" label="PR Numero 98749849" />
                } action={<Button variant="contained">Botón</Button>} />
                <CardContent>
                    <Stack spacing={2}>
                        <Table
                            columns={[
                                { id: 'material', label: 'Material', render: (row) => row.material },
                                { id: 'material-icon', label: 'Material', render: (row) => <MaterialType material={row.material as Material} label={row.label} /> },
                                { id: 'label', label: 'Etiqueta', render: (row) => row.label },
                                {
                                    id: 'actions', align: 'right', label: 'Acciones', render: () => (
                                        <Stack spacing={2} direction="row" justifyContent="flex-end">
                                            <Button variant="contained" color="secondary">
                                                secundario
                                            </Button>
                                            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                                                Nuevo Mensaje
                                            </Button>
                                        </Stack>
                                    )
                                },
                            ]}
                            rows={[
                                { material: 'Gold', label: 'Oro' },
                                { material: 'Silver', label: 'Plata' },
                                { material: 'Collected', label: 'Recogido en vitrina (PKL)' },
                                { material: 'ExclusiveBrand', label: 'Marca exclusiva' },
                            ]}
                        />
                    </Stack>
                </CardContent>
            </Card>
            <Divider sx={{ my: 2 }} />

            <ModalInputIndex
                open={openModal}
                onClose={handleCloseModal}
            />
            
        </>
    );
}

export default MaterialTypeIndex;