import { createTheme } from "@mui/material/styles";
import darkScrollbar from "@mui/material/darkScrollbar";
export const ThemeOptions = createTheme({
    palette: {
        mode: 'dark',
        primary: {
          main: '#cb653d',
        },
        secondary: {
          main: '#b84ec9',
          dark: 'rgba(102,43,109,0.4)',
        },
        background: {
          default: '#160f0f',
          paper: '#371f1f',
        },
      },
      spacing: 8,
      shape: {
        borderRadius: 4,
      },
      props: {
        MuiAppBar: {
          color: 'secondary',
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
        MuiTooltip: {
          arrow: true,
        },
      },
      components: {
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
              transition:
                'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              background: 'linear-gradient(25deg, #b84ec9 30%, #cb653d 90%)',
              border: 0,
              borderRadius: 3,
              boxShadow: '0 3px 5px 2px rgba(102,43,109,0.8)',
              color: 'white',
              height: 48,
              padding: '0 30px',
            },
          },
        },
      },
});
