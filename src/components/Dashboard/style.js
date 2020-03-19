import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    minHeight: "100vh",
    background: theme.palette.secondary.light,
  },
  container: {
    paddingTop: "15vh",
  },
  paper: {
    padding: "30px 0",
    maxWidth: "100%",
    [theme.breakpoints.up("md")]: {
      padding: 50,
    },
  },
  header: {
    fontSize: "1.3rem",
    textTransform: "uppercase",
    marginBottom: 30,
  },
  icon: {
    transition: "all 0.3s",
    color: theme.palette.primary.light,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  modalHeaderSection: {
    background: theme.palette.secondary.main,
  },
  modalHeader: {
    color: "#fff",
    fontSize: "1.2rem",
  },
  modalBody: {
    marginTop: 20,
  },
  modalLabel: {
    fontWeight: 600,
  },
}))

export default useStyles
