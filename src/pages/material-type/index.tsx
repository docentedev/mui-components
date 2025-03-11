import { Button, Card, CardContent, CardHeader, Divider, Grid2, Stack, Typography } from '@mui/material';
import { MaterialType } from '../../components/material-type';
import Table from '../../components/table';
import { Material } from '../../components/material-type/types';
import Input from '../../components/input';
import React, { useState } from 'react';
import MonthRangePicker from '../../components/month-range-picker';

interface MaterialTypeIndexProps {
    title: string;
}

const MaterialTypeIndex: React.FC<MaterialTypeIndexProps> = ({ title }) => {
    const [value, setValue] = useState('');
    const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(), new Date()]); // Enero 2021 a Diciembre 2021

    const handleDateChange = (newDateRange: [Date, Date]) => {
        setDateRange(newDateRange);
    };
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
                    <Grid2 container spacing={2}>
                        <Grid2 size={4}>
                            <MonthRangePicker
                                value={dateRange}
                                onChange={handleDateChange}
                            />
                        </Grid2>
                        <Grid2 size={2}>
                            <Input
                                label="Nombre"
                                value={value}
                                type="search"
                                onChange={(event) => setValue(event.target.value)}
                            />
                        </Grid2>
                        <Grid2 size={2}>
                            <Input
                                label="Nombre"
                                value={value}
                                onChange={(event) => setValue(event.target.value)}
                            />
                        </Grid2>
                        <Grid2 size={4}>
                            <MonthRangePicker
                                value={dateRange}
                                onChange={handleDateChange}
                            />
                        </Grid2>
                    </Grid2>
                </CardContent>
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
                                            <Button variant="contained" color="primary">
                                                primario
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
        </>
    );
}

export default MaterialTypeIndex;