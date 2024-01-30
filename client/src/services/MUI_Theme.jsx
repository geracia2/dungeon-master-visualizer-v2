import { createTheme } from "@mui/material/styles";
import darkScrollbar from '@mui/material/darkScrollbar';
export const ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#cb653d',
      light: '#d48363',
      dark: '#92472a',
      contrastText: '#fdfdfd',
    },
    secondary: {
      main: '#c541da',
      light: '#5f4aea',
      dark: '#793285',
      contrastText: '#ffffff',
    },
    background: {
      default: '#282c34',
      paper: '#2f2424',
    },
    text: {
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      hint: '#201848',
      primary: '#f1eeee',
    },
  },
  spacing: 5,
  shape: {
    borderRadius: 12,
  },
  props: {
    MuiAppBar: {
      color: 'secondary',
    },
    MuiTooltip: {
      arrow: true,
    },
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: 'small',
    },
    MuiButton: {
      size: 'small',
    },
    MuiButtonGroup: {
      size: 'small',
    },
    MuiCheckbox: {
      size: 'small',
    },
    MuiFab: {
      size: 'small',
    },
    MuiFormControl: {
      margin: 'dense',
      size: 'small',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiRadio: {
      size: 'small',
    },
    MuiSwitch: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
      size: 'small',
    },
  },
  components: {
    // MuiCssBaseline: {
    //   styleOverrides: (themeParam) => ({
    //     body: themeParam.palette.mode === "dark" ? darkScrollbar() : null,
    //   }),
    // },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 46,
          height: 27,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + $track': {
              opacity: 1,
              border: 'none',
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: '1px solid #bdbdbd',
          backgroundColor: '#fafafa',
          opacity: 1,
          transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
      },
    },
  },
});
