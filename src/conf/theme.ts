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
    secondary: {
      main: Token.Color.SecondaryMain,
      light: Token.Color.SecondaryLight,
      dark: Token.Color.SecondaryDark,
    },
    common: {
      black: Token.Color.Dark,
      white: Token.Color.Light,
    },
  },
});

export default theme;