import { Container, Grid2 } from '@mui/material';
import MaterialTypeIndex from './pages/material-type';

function App() {
  return (
    <Container sx={{ py: 4 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <MaterialTypeIndex title="Componente Tipo de Material" />
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default App
