import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  container: {
    paddingTop: "5vh",
    paddingBottom: "5vh",
  },
  image: {
    minWidth: "50%",
  },
  flexLine: {
    display: "flex",
    justifyContent: "flex-start",
  },
  line: {
    borderLeft: `5px solid ${theme.palette.secondary.light}`,
    minHeight: "100%",
    marginRight: 10,
  },
  rightLetter: {
    textTransform: "capitalize",
    color: theme.palette.secondary.main,
  },
  flex: {
    display: "flex",
    justifyContent: "flex-start",
  },
}))

export default useStyles
