import { blueGrey, indigo } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

function pxToRem(value) {
  return `${value / 16}rem`
}

const breakpoints = createBreakpoints({
  values: {
    xs: 375,
    sm: 410,
    md: 765,
    lg: 1025,
    xl: 1370,
  },
})

const theme = createMuiTheme({
  breakpoints,
  palette: {
    primary: {
      light: blueGrey[100],
      main: blueGrey[600],
      dark: blueGrey[900],
    },
    secondary: {
      light: indigo[100],
      main: indigo.A200,
      dark: indigo.A700,
    },
    warning: {
      light: indigo.A200,
      main: indigo.A400,
      dark: indigo.A700,
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
  },
  overrides: {
    MuiTypography: {
      h1: {
        textTransform: 'capitalize',
        fontSize: pxToRem(35),
        [breakpoints.up('md')]: {
          fontSize: pxToRem(60),
        },
      },
      h2: {
        textTransform: 'capitalize',
        fontSize: pxToRem(28),
        [breakpoints.up('md')]: {
          fontSize: pxToRem(50),
        },
      },
      h3: {
        textTransform: 'capitalize',
        fontSize: pxToRem(24),
        [breakpoints.up('md')]: {
          fontSize: pxToRem(40),
        },
      },
      h4: {
        textTransform: 'capitalize',
        fontSize: pxToRem(22),
        [breakpoints.up('md')]: {
          fontSize: pxToRem(30),
        },
      },
      h5: {
        textTransform: 'capitalize',
        fontSize: pxToRem(20),
        [breakpoints.up('md')]: {
          fontSize: pxToRem(20),
        },
      },
      h6: {
        textTransform: 'capitalize',
        fontSize: pxToRem(15),
      },
      body1: {
        textTransform: 'capitalize',
        fontWeight: 600,
      },
    },
  },
})

export default theme
