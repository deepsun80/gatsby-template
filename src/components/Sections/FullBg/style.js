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
    justifyContent: "flex-start",
    height: "85vh",
    [theme.breakpoints.up("md")]: {
      height: "85vh",
    },
    [theme.breakpoints.up("lg")]: {
      height: "70vh",
    },
  },
  paper: {
    padding: "3vh 5vw",
    [theme.breakpoints.up("sm")]: {
      padding: "2vh 5vw",
    },
    [theme.breakpoints.up("md")]: {
      padding: "5vh 5vw",
    },
    maxWidth: "100%",
    minWidth: "60vw",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    border: "1px solid #fff",
  },
  button: {
    [theme.breakpoints.up("lg")]: {
      padding: "10px 80px",
    },
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
    marginTop: "2vh",
    marginBottom: "3vh",
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
    marginBottom: "-5px",
    padding: 0,
  },
}))

export default useStyles
