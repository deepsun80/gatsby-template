import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  grid: {
    padding: 20,
  },
  container: {
    transform: "translateY(100px)",
    [theme.breakpoints.up("md")]: {
      transform: "translateY(135px)",
    },
  },
  content: {
    padding: "0 !important",
  },
  gridColor: {
    background: theme.palette.secondary.light,
    overflow: "hidden",
  },
  flex: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "flex-start",
    },
  },
  header: {
    fontSize: "1.8rem",
    [theme.breakpoints.up("xl")]: {
      fontSize: "2.5rem",
    },
  },
  rightLetter: {
    fontSize: "1.8rem",
    [theme.breakpoints.up("xl")]: {
      fontSize: "2.5rem",
      marginLeft: 15,
    },
  },
  subtitle: {
    marginTop: "1vh",
    fontSize: "0.7rem",
    [theme.breakpoints.up("lg")]: {
      fontSize: "1rem",
      lineHeight: "2rem",
    },
  },
}))

export default useStyles
