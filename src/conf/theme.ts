import { createTheme } from '@mui/material';
import Token from '../tokens';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: Token.Color.PrimaryMain,
      light: Token.Color.PrimaryLight,
      dark: Token.Color.PrimaryDark,
    },
  },
});

export default theme;