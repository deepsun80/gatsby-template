import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  container: {
    padding: "20vh 0 10vh",
    textAlign: "center",
  },
  paper: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  border: {
    border: "1px solid #fff",
    width: 650,
    maxWidth: "90%",
    margin: "auto",
    padding: 5,
  },
  header: {
    color: "#fff",
    textTransform: "capitalize",
    lineHeight: "4rem",
  },
  headerSpan: {
    textTransform: "capitalize",
    color: theme.palette.secondary.light,
  },
  subtitle: {
    background: "#fff",
    width: "50%",
    margin: "0px auto -15px",
    color: theme.palette.primary.main,
  },
}))

export default useStyles
