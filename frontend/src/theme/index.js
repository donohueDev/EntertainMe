import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgba(218, 165, 32, 0.7)', // goldenrod with transparency
    },
    background: {
      default: '#051426', // navy blue
      paper: '#051426',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          '&.MuiButton-contained': {
            backgroundColor: '#051426',
            border: '1px solid rgba(218, 165, 32, 0.5)',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#051426',
              border: '1px solid goldenrod',
              boxShadow: '0 0 5px rgba(218, 165, 32, 0.3)',
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(218, 165, 32, 0.5)',
            },
            '&:hover fieldset': {
              borderColor: 'goldenrod',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'goldenrod',
            }
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            '&.Mui-focused': {
              color: 'goldenrod',
            }
          },
          '& .MuiInputBase-input': {
            color: '#FFFFFF',
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#051426',
          border: '1px solid rgba(218, 165, 32, 0.3)',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(218, 165, 32, 0.2)',
          background: 'linear-gradient(to bottom, #FFFFFF 0%, goldenrod 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          backgroundColor: '#051426',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          backgroundColor: '#051426',
          borderTop: '1px solid rgba(218, 165, 32, 0.2)',
          padding: 16,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(218, 165, 32, 0.5)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'goldenrod',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'goldenrod',
          },
          '& .MuiSvgIcon-root': {
            color: 'goldenrod'
          },
          color: 'white'
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: 'goldenrod',
        },
        iconHover: {
          color: 'goldenrod',
        },
        iconEmpty: {
          color: 'rgba(218, 165, 32, 0.3)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#051426',
          border: '1px solid rgba(218, 165, 32, 0.3)',
          transition: 'all 0.2s ease-in-out',
          borderRadius: 12,
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 0 20px rgba(218, 165, 32, 0.2)'
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          '& .MuiSvgIcon-root': { 
            color: 'goldenrod' 
          },
          '&:hover': {
            backgroundColor: 'rgba(218, 165, 32, 0.08)'
          }
        }
      }
    }
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: '0.02em',
      background: 'linear-gradient(to bottom, #FFFFFF 0%, goldenrod 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      color: '#FFFFFF',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h3: {
      color: '#FFFFFF',
      fontWeight: 600,
    },
    h4: {
      color: '#FFFFFF',
      fontWeight: 500,
    },
    h5: {
      color: '#FFFFFF',
      fontWeight: 500,
    },
    h6: {
      color: '#FFFFFF',
      fontWeight: 500,
    },
    body1: {
      color: '#FFFFFF',
    },
    body2: {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    }
  },
});

// Common style mixins that can be reused
export const commonStyles = {
  gradientText: {
    background: 'linear-gradient(to bottom, #FFFFFF 0%, goldenrod 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 0 20px rgba(218, 165, 32, 0.5)'
  },
  cardHover: {
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 0 20px rgba(218, 165, 32, 0.2)',
    },
  },
  goldenBorder: {
    border: '1px solid rgba(218, 165, 32, 0.3)',
  },
  goldenHover: {
    '&:hover': {
      border: '1px solid goldenrod',
      boxShadow: '0 0 5px rgba(218, 165, 32, 0.3)',
    },
  },
  // Common text shadow for golden text
  goldenTextShadow: {
    textShadow: `-1px -1px 0 goldenrod,  
                  1px -1px 0 goldenrod,
                  -1px 1px 0 goldenrod,
                  1px 1px 0 goldenrod,
                  0 0 15px rgba(218, 165, 32, 0.5)`
  }
};

export default theme;
