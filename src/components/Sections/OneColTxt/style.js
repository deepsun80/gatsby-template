import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  container: {
    paddingTop: "5vh",
    paddingBottom: "5vh",
    [theme.breakpoints.up("xl")]: {
      paddingTop: "12vh",
      paddingBottom: "5vh",
    },
  },
  paper: {
    position: "relative",
    zIndex: 1,
    backgroundColor: "transparent",
  },
  flex: {
    display: "flex",
    justifyContent: "flex-start",
  },
  line: {
    borderLeft: `5px solid ${theme.palette.secondary.light}`,
    minHeight: "100%",
    marginRight: 10,
  },
  rightLetter: {
    color: theme.palette.secondary.main,
    textTransform: "capitalize",
  },
  text: {
    marginTop: 30,
  },
}))

export default useStyles
