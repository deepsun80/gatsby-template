import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: 500,
  },
  flex: {
    display: "flex",
    justifyContent: "flex-start",
    width: "90%",
    paddingBottom: 10,
    borderBottom: `3px solid ${theme.palette.secondary.light}`,
  },
  grid: {
    display: "flex",
    alignItems: "center",
  },
  rightLetter: {
    color: theme.palette.secondary.main,
    textTransform: "capitalize",
  },
  subHeader: {
    fontStyle: "italic",
  },
  text: {
    marginTop: 30,
  },
}))

export default useStyles
