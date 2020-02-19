import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  background: {
    background: `linear-gradient(top, ${theme.palette.secondary.light} 40%, #fff 40%)`,
  },
  container: {},
  image: {},
}))

export default useStyles
