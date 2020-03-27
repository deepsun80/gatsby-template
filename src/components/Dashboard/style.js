import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    minHeight: "100vh",
    background: theme.palette.primary.light,
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
  searchField: {
    width: 320,
    maxWidth: "100%",
    marginBottom: 30,
    display: "inline-block",
  },
  header: {
    fontSize: "1.3rem",
    textTransform: "uppercase",
    marginBottom: 30,
  },
  icon: {
    transition: "all 0.3s",
    "&::-webkit-transition": "all 0.3s",
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
  modalSmallHeader: {
    fontWeight: 600,
    marginTop: 20,
    paddingLeft: 10,
  },
  footer: {
    background: theme.palette.primary.light,
  },
  copyrightContainer: {
    marginBottom: 10,
  },
  copyright: {
    textTransform: "capitalize",
  },
  loader: {
    position: "absolute",
    left: "50vw",
    top: "25vh",
    transform: " translateX(-50%)",
    "&::-webkit-transform": " translateX(-50%)",
  },
  modalLoader: {
    position: "absolute",
    left: "20vw",
    top: "10vh",
    transform: " translateX(-50%)",
    "&::-webkit-transform": " translateX(-50%)",
  },
  input: {
    paddingLeft: 10,
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  tableHeader: {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  tableBody: {
    color: theme.palette.primary.main,
  },
}))

export default useStyles
