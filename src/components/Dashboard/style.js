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
  },
  icon: {
    transition: "all 0.3s",
    "&::-webkit-transition": "all 0.3s",
    color: theme.palette.primary.light,
    "&:hover": {
      color: theme.palette.secondary.main,
      cursor: "pointer",
    },
  },
  disabledIcon: {
    color: theme.palette.primary.light,
  },
  modalHeaderSection: {
    background: theme.palette.primary.main,
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
  modalSmallHeaderSpan: {
    fontWeight: 600,
    color: theme.palette.secondary.main,
  },
  footer: {
    background: theme.palette.primary.light,
  },
  copyright: {
    textTransform: "capitalize",
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
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  tableBody: {
    color: theme.palette.primary.main,
  },
  tableBodyDisabled: {
    color: theme.palette.primary.light,
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
