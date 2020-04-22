import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  container: {
    paddingTop: "5vh",
    paddingBottom: "12vh",
    [theme.breakpoints.up("xl")]: {
      paddingTop: "12vh",
      paddingBottom: "15vh",
    },
  },
  paper: {
    position: "relative",
    zIndex: 1,
  },
  flex: {
    display: "flex",
    justifyContent: "flex-start",
  },
  gridFlex: {
    display: "flex",
    alignItems: "center",
  },
  line: {
    borderLeft: `5px solid ${theme.palette.secondary.light}`,
    minHeight: "100%",
    marginRight: 10,
  },
  rightLetter: {
    marginLeft: 15,
    fontStyle: "italic",
  },
  text: {
    marginTop: 30,
  },
  // button: {
  //   marginTop: 50,
  //   "&:hover": {
  //     color: "#fff",
  //     background: theme.palette.secondary.light,
  //     border: `1px solid ${theme.palette.secondary.light}`,
  //   },
  // },
}))

export default useStyles
