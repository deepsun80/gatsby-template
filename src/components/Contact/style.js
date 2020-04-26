import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  section: {
    padding: 0,
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    padding: "8vh 10px 10vh",
  },
  header: {
    color: "#fff",
  },
  subHeader: {
    color: "#fff",
    fontStyle: "italic",
  },
  paper: {
    padding: 30,
    marginTop: 50,
  },
  field: {
    marginTop: 30,
  },
  button: {
    marginTop: 40,
    color: "#fff",
  },
  successMessage: {
    color: theme.palette.secondary.main,
    display: "block",
    margin: "30px auto",
  },
  errorMessage: {
    color: theme.palette.error.main,
    display: "block",
    margin: "30px auto",
  },
  validationMessage: {
    color: theme.palette.error.main,
    marginTop: 20,
  },
  loader: {
    position: "absolute",
    left: "50vw",
    top: "50vh",
    zIndex: 2,
    transform: " translateX(-50%)",
    "&::-webkit-transform": " translateX(-50%)",
  },
}))

export default useStyles
