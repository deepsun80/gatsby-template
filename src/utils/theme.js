import { blueGrey, teal } from "@material-ui/core/colors"
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
      light: teal[100],
      main: teal[300],
      dark: teal[700],
    },
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
        fontWeight: 600,
        fontSize: pxToRem(35),
        [breakpoints.up("lg")]: {
          fontSize: pxToRem(60),
        },
      },
      h2: {
        fontFamily: "Raleway, sans-serif",
        textTransform: "capitalize",
        fontWeight: 600,
        fontSize: pxToRem(28),
        [breakpoints.up("lg")]: {
          fontSize: pxToRem(50),
        },
      },
      h3: {
        textTransform: "capitalize",
        fontWeight: 600,
        fontSize: pxToRem(24),
        [breakpoints.up("lg")]: {
          fontSize: pxToRem(40),
        },
      },
      h4: {
        fontFamily: "Roboto Slab, serif",
        textTransform: "capitalize",
        fontSize: pxToRem(22),
        [breakpoints.up("lg")]: {
          fontSize: pxToRem(30),
        },
      },
      h5: {
        fontFamily: "Roboto Slab, serif",
        textTransform: "capitalize",
        fontSize: pxToRem(20),
        [breakpoints.up("lg")]: {
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
    MuiPaper: {
      rounded: {
        borderRadius: 0,
      },
    },
    MuiButton: {
      root: {
        borderRadius: 0,
      },
    },
  },
})

export default theme
