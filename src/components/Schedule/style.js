import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  section: {
    minHeight: "80vh",
    marginBottom: "15vh",
  },
  container: {
    paddingTop: "12vh",
  },
  paper: {
    padding: 30,
    boxShadow: `30px 30px ${theme.palette.secondary.light}`,
    border: `1px solid ${theme.palette.secondary.light}`,
    position: "relative",
    zIndex: 1,
  },
  field: {
    marginTop: 30,
  },
  button: {
    marginTop: 30,
  },
  successMessage: {
    color: theme.palette.secondary.main,
    display: "block",
    fontWeight: 500,
    marginBottom: 10,
  },
  subSuccessMessage: {
    color: theme.palette.primary.main,
    display: "block",
    fontWeight: 500,
    fontStyle: "italic",
  },
  errorMessage: {
    color: theme.palette.error.main,
    display: "block",
    fontWeight: 500,
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
      "&::-webkit-transition": "all 0.5s",
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
