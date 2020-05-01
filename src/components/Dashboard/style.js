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
    color: "#fff",
    backgroundColor: "blue",
    "&:hover": {
      backgroundColor: "mediumblue",
    },
    "&:disabled": {
      color: "#fff",
      backgroundColor: "lightgrey",
    },
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
  iconFa: {
    color: "blue",
    opacity: 0.7,
    padding: 0,
    fontSize: "2rem",
    cursor: "pointer",
    transition: "all 0.3s",
    "&:hover": {
      opacity: 0.5,
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
    paddingTop: 15,
    paddingLeft: 10,
  },
  modalLabel: {
    fontWeight: 600,
    color: "darkslategrey",
  },
  modalLabelHigh: {
    fontWeight: 600,
    color: "darkslategrey",
    lineHeight: "2.5rem",
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
    color: "cornflowerblue",
  },
  loadContainer: {
    position: "absolute",
    zIndex: 199,
    width: "100%",
    textAlign: "center",
    color: "blue",
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
  flexResponsiveSmall: {
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      justifyContent: "space-between",
    },
    paddingBottom: 30,
  },
  tableHeader: {
    color: "slategrey",
    fontWeight: 600,
  },
  invoiceGrid: {
    marginTop: 10,
  },
  formControl: {
    paddingRight: 10,
  },
  createInvoiceSelectField: {
    height: 40,
  },
  error: {
    color: theme.palette.error.main,
    display: "block",
    fontWeight: 500,
  },
  invoiceSmallHeader: {
    color: theme.palette.primary.main,
    opacity: 0.7,
    fontWeight: 600,
    fontSize: "0.7rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.8rem",
    },
  },
  invoiceSmallBody: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: "0.7rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.8rem",
    },
  },
  invoiceSmallBodySpan: {
    color: theme.palette.secondary.main,
    fontWeight: 600,
    fontSize: "0.7rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.8rem",
    },
  },
  invoiceList: {
    listStyle: "none",
    padding: 0,
  },
  invoiceBox: {
    background: "#ededed",
    minHeight: "30vh",
    borderRadius: 10,
    padding: 5,
  },
  subBox: {
    background: "#ededed",
    borderRadius: 10,
  },
  calendly: {
    width: 60,
    height: 60,
    marginLeft: 30,
    transition: "all 0.3s",
    "&:hover": {
      opacity: 0.7,
    },
  },
}))

export default useStyles
