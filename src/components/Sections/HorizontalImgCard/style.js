import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  card: {
    maxWidth: "95%",
    margin: "50px auto",
  },
  content: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  image: {
    minWidth: "50%",
  },
  subText: {
    fontWeight: 600,
    marginTop: 30,
    textAlign: "right",
    textTransform: "capitalize",
  },
}))

export default useStyles
