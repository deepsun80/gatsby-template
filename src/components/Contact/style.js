import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  section: {
    minHeight: "80vh",
    padding: "10vh 0",
    backgroundColor: theme.palette.secondary.light,
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
  link: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "12vh",
    "&:hover": {
      cursor: "pointer",
    },
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: "1.6rem",
    "&:hover": {
      transition: "all 0.5s",
      "&::-webkit-transition": "all 0.5s",
      color: theme.palette.secondary.light,
    },
  },
  iconText: {
    color: theme.palette.primary.main,
    textTransform: "capitalize",

    fontSize: "1.2rem",
    marginLeft: 10,
    "&:hover": {
      transition: "all 0.5s",
      color: theme.palette.secondary.light,
    },
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
