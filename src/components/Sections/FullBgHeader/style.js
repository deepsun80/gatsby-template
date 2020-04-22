import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  container: {
    padding: "10vh 0 5vh",
    textAlign: "center",
  },
  paper: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  header: {
    color: "#fff",
    textTransform: "capitalize",
  },
  headerSpan: {
    textTransform: "capitalize",
    color: theme.palette.secondary.light,
  },
  subtitle: {
    color: "#fff",
  },
}))

export default useStyles
