import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  container: {
    padding: "12vh 0vw",
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
    marginTop: 30,
  },
}))

export default useStyles
