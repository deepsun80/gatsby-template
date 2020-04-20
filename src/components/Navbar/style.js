import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  appPadding: {
    paddingTop: "1vh",
    [theme.breakpoints.up("sm")]: {
      paddingTop: "2vh",
    },
    [theme.breakpoints.up("lg")]: {
      paddingBottom: "1vh",
    },
  },
  logo: {
    cursor: "pointer",
    transition: "all 0.5s",
    "&::-webkit-transition": "all 0.5s",
  },
  logoPrimaryHeight: {
    maxHeight: 60,
    maxWidth: 160,
    [theme.breakpoints.up("md")]: {
      maxHeight: 65,
    },
    [theme.breakpoints.up("lg")]: {
      maxHeight: 80,
      maxWidth: 200,
    },
  },
  logoSecondaryHeight: {
    maxHeight: 45,
    maxWidth: 130,
    [theme.breakpoints.up("md")]: {
      maxHeight: 50,
    },
    [theme.breakpoints.up("lg")]: {
      maxHeight: 60,
      maxWidth: 170,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  navPrimaryColor: {
    background: "transparent",
    boxShadow: "none",
  },
  navSecondaryColor: {
    background: "#fff",
    boxShadow:
      " 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
  iconPrimaryColor: {
    color: "#fff",
  },
  iconSecondaryColor: {
    color: theme.palette.primary.main,
  },
  navLink: {
    fontFamily: "Roboto Condensed, sans-serif",
    textTransform: "uppercase",
    padding: 0,
    margin: "1.3vh 15px 0px",
    fontSize: "0.9rem",
    transition: "all 0.2s",
    "&::-webkit-transition": "all 0.2s",
    [theme.breakpoints.up("md")]: {
      borderBottom: "2px solid transparent",
    },
    "&:hover": {
      color: theme.palette.secondary.main,
      [theme.breakpoints.up("md")]: {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
      },
      background: "transparent",
    },
    paddingBottom: "1vh",
  },
  navLinkPrimaryColor: {
    color: theme.palette.primary.dark,
    [theme.breakpoints.up("md")]: {
      color: "#fff",
    },
  },
  navLinkSecondaryColor: {
    color: theme.palette.primary.dark,
    "&:hover": {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
  navButton: {
    color: "#fff",
    border: "1px solid #fff",
    "&:hover": {
      background: theme.palette.secondary.light,
      border: `1px solid ${theme.palette.secondary.light}`,
    },
  },
  mobileButton: {
    margin: "1vh 2vw",
  },
  modalBody: {
    margin: "20px auto",
  },
}))

export default useStyles
