import { Alert, AlertTitle, Collapse, Stack } from '@mui/material';

interface I18N {
    type: 'error' | 'warning' | 'info' | 'success';
    title: string;
    label: string;
}

const initialState18N: I18N = {
    type: 'info',
    title: 'title',
    label: 'label'
}

interface alertCardIndexProps {
    i18n?: Partial<I18N>;
    open: boolean;
    onClose: () => void;
}

const AlertCard: React.FC<alertCardIndexProps> = ({
    i18n,
    open,
    onClose,
}) => {
    const lang = i18n ? { ...initialState18N, ...i18n } : initialState18N;

    return(
        <Stack>
            <Collapse in={open}>
                <Alert 
                    severity={lang.type}
                    onClose={onClose}
                >
                    <AlertTitle>{lang.title}</AlertTitle>
                    {lang.label}
                </Alert>
            </Collapse>
        </Stack>
    )
}

export default AlertCard;