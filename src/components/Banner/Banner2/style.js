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
    display: "flex",
    justifyContent: "flex-start",
  },
  header: {
    fontSize: "2.5rem"
  },
  rightLetter: {
    fontSize: "2.5rem",
    marginLeft: 15,
  },
  subtitle: {
    lineHeight: "2rem"
  },
}))

export default useStyles
