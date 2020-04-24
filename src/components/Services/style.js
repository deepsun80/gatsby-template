import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  container: {
    paddingBottom: "10vh",
  },
  middleGrid: {
    [theme.breakpoints.up("md")]: {
      marginTop: "-30px",
    },
  },
}))

export default useStyles
