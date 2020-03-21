import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  section: {
    minHeight: "80vh",
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
}))

export default useStyles
