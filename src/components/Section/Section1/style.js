import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  container: {
    paddingTop: "5vh",
    paddingBottom: "12vh",
    [theme.breakpoints.up("xl")]: {
      paddingTop: "12vh",
      paddingBottom: "15vh",
    },
  },
  paper: {
    position: "relative",
    zIndex: 1,
  },
  flex: {
    display: "flex",
    justifyContent: "flex-start",
  },
  button: {
    marginTop: 50,
    "&:hover": {
      color: "#fff",
      background: theme.palette.secondary.light,
      border: `1px solid ${theme.palette.secondary.light}`,
    },
  },
  rightLetter: {
    marginLeft: 15,
  },
  text: {
    marginTop: 30,
  },
  image: {
    boxShadow: `30px -30px ${theme.palette.secondary.light}`,
    marginTop: 50,
  },
}))

export default useStyles
