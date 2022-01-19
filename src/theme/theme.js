import { createTheme } from '@mui/material';
import { indigo, teal } from '@mui/material/colors';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'initial',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '0.5rem 1rem',
          backgroundColor: indigo[100],
        },
        title: {
          textTransform: 'capitalize',
        },
        subheader: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          justifyContent: 'flex-end',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '0.5rem 1rem',
          ':first-letter': {
            textTransform: 'capitalize',
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: indigo[900],
    },
    secondary: {
      main: teal[300],
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
  },
});

export default theme;
