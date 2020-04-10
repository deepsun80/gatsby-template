import { blueGrey, indigo } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles"
import createBreakpoints from "@material-ui/core/styles/createBreakpoints"

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
    // -- Used for Dashboard --
    info: {
      light: indigo[100],
      main: indigo.A200,
      dark: indigo.A700,
    },
    // ------
    background: {
      default: "#fff",
      paper: "#fff",
    },
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontFamily: "Raleway, sans-serif",
        textTransform: "capitalize",
        fontSize: pxToRem(35),
        [breakpoints.up("md")]: {
          fontSize: pxToRem(60),
        },
      },
      h2: {
        fontFamily: "Raleway, sans-serif",
        textTransform: "capitalize",
        fontSize: pxToRem(28),
        [breakpoints.up("md")]: {
          fontSize: pxToRem(50),
        },
      },
      h3: {
        textTransform: "capitalize",
        fontSize: pxToRem(24),
        [breakpoints.up("md")]: {
          fontSize: pxToRem(40),
        },
      },
      h4: {
        fontFamily: "Roboto Slab, serif",
        textTransform: "capitalize",
        fontSize: pxToRem(22),
        [breakpoints.up("md")]: {
          fontSize: pxToRem(30),
        },
      },
      h5: {
        fontFamily: "Roboto Slab, serif",
        textTransform: "capitalize",
        fontSize: pxToRem(20),
        [breakpoints.up("md")]: {
          fontSize: pxToRem(20),
        },
      },
      h6: {
        fontFamily: "Roboto Slab, serif",
        textTransform: "capitalize",
        fontSize: pxToRem(15),
      },
      subtitle1: {
        fontFamily: "Roboto Slab, serif",
        fontStyle: "italic",
      },
      subtitle2: {
        fontFamily: "Roboto Slab, serif",
        fontStyle: "italic",
      },
      body1: {
        fontFamily: "Roboto Slab, serif",
        textTransform: "capitalize",
      },
      body2: {
        fontFamily: "Roboto, sans-serif",
        textTransform: "none",
      },
      caption: {
        fontFamily: "Roboto, sans-serif",
        textTransform: "none",
      },
    },
  },
})

export default theme
