import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    height: "80vh",
  },
  paper: {
    textAlign: "right",
    padding: "10vh 5vw 5vh",
    width: 800,
    maxWidth: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  header: {
    color: "#fff",
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
}))

export default useStyles
