import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    height: "90vh",
  },
  container: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    height: "70vh",
    [theme.breakpoints.up("md")]: {
      height: "70vh",
    },
  },
  paper: {
    padding: "5vh 5vw",
    [theme.breakpoints.up("sm")]: {
      padding: "0vh 5vw",
    },
    [theme.breakpoints.up("md")]: {
      padding: "5vh 5vw",
    },
    maxWidth: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    border: "1px solid #fff",
  },
  header: {
    color: "#fff",
    textTransform: "capitalize",
    [theme.breakpoints.up("xl")]: {
      fontSize: "5em",
    },
  },
  headerSpan: {
    textTransform: "capitalize",
    color: theme.palette.secondary.light,
  },
  subtitle: {
    color: "#fff",
    marginTop: "3vh",
    marginBottom: "1vh",
  },
  verticalButton: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s",
    color: "#fff",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  icon: {
    fontSize: "3rem",
    marginBottom: "-10px",
    padding: 0,
  },
  scrollDown: {
    minHeight: "230px",
    background: "#fff",
    transformOrigin: "top right",
    transform: "skewY(7deg)",
    [theme.breakpoints.up("sm")]: {
      transform: "skewY(5deg)",
    },
    [theme.breakpoints.up("md")]: {
      transform: "skewY(7deg)",
    },
    marginBottom: "-230px",
    [theme.breakpoints.up("md")]: {
      marginBottom: "-300px",
    },
  },
}))

export default useStyles
