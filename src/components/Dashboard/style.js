import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    minHeight: "100vh",
    background: "#e1e9ee",
  },
  container: {
    paddingTop: "15vh",
  },
  button: {
    color: "blue",
  },
  buttonDark: {
    color: "mediumblue",
  },
  paper: {
    padding: "30px 0",
    maxWidth: "100%",
    [theme.breakpoints.up("md")]: {
      padding: 50,
    },
  },
  link: {
    color: "blue",
  },
  selectField: {
    backgroundColor: "#fff",
    width: 320,
    marginBottom: 10,
  },
  searchField: {
    maxWidth: "80%",
    marginBottom: 30,
    display: "inline-block",
    [theme.breakpoints.up("md")]: {
      width: 320,
    },
  },
  header: {
    fontSize: "1.3rem",
    textTransform: "uppercase",
    marginBottom: 30,
    color: "darkslategrey",
  },
  iconPrimary: {
    color: "blue",
    opacity: 0.75,
  },
  icon: {
    transition: "all 0.3s",
    "&::-webkit-transition": "all 0.3s",
    color: "gainsboro",
    "&:hover": {
      color: "blue",
      cursor: "pointer",
    },
  },
  disabledIcon: {
    color: "gainsboro",
  },
  modalHeaderSection: {
    background: "slategrey",
  },
  modalHeader: {
    color: "#fff",
    fontSize: "1.2rem",
  },
  modalBody: {
    marginTop: 20,
    color: "inherit",
  },
  modalSecondaryBody: {
    color: "blue",
    marginTop: 10,
    paddingLeft: 10,
  },
  modalLabel: {
    fontWeight: 600,
    color: "darkslategrey",
  },
  modalSmallHeader: {
    fontWeight: 600,
    marginTop: 20,
    color: "darkslategrey",
  },
  modalSmallHeaderSpan: {
    fontWeight: 600,
    color: "blue",
  },
  footer: {
    background: "#e1e9ee",
  },
  copyright: {
    textTransform: "capitalize",
    color: "darkslategrey",
  },
  copyrightContainerLeft: {
    marginBottom: 10,
  },
  copyrightContainerRight: {
    marginBottom: 10,
    [theme.breakpoints.up("lg")]: {
      textAlign: "right",
    },
  },
  loader: {
    color: "#fff",
    margin: "auto",
    overflow: "hidden",
  },
  input: {
    paddingLeft: 10,
    maxWidth: "76%",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  flexResponsive: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  tableHeader: {
    color: "slategrey",
    fontWeight: 600,
  },
  formControl: {
    marginBottom: 30,
  },
  error: {
    color: theme.palette.error.main,
    display: "block",
    fontWeight: 500,
  },
  box: {
    background: "#ededed",
    minHeight: "30vh",
    margin: "10px auto",
    borderRadius: 10,
    padding: "5px 0px",
  },
}))

export default useStyles
