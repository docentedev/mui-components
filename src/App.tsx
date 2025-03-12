import { Container, Grid2 } from '@mui/material';
import MaterialTypeIndex from './pages/material-type';
import ModalInputIndex from './pages/modal-input';

function App() {
  return (
    <Container sx={{ py: 4 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <MaterialTypeIndex title="Componente Tipo de Material" />
          <ModalInputIndex title="Componente Modal Input" />
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default App
