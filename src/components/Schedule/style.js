import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  gridContainer: {
    margin: "10vh auto",
  },
  formContainer: {
    marginRight: 0,
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
    bottom: "50%",
    zIndex: 2,
    transform: " translateX(-50%)",
    "&::-webkit-transform": " translateX(-50%)",
  },
  iconGrid: {
    marginRight: 0,
    textAlign: "left",
  },
  flex: {
    display: "flex",
    marginBottom: 20,
  },
  smIcon: {
    fontSize: "2rem",
    color: theme.palette.secondary.main,
  },
  smHeader: {
    fontSize: "1.25rem",
    marginLeft: 15,
    textTransform: "uppercase",
  },
  divider: {
    margin: "5vh auto",
    color: theme.palette.secondary.main,
  },
}))

export default useStyles
