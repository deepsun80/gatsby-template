import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  cardContent: {
    minHeight: 200,
    textAlign: "center",
  },
  header: {
    fontSize: "1.2rem",
    lineHeight: "2rem",
  },
  line: {
    borderBottom: `3px solid ${theme.palette.secondary.light}`,
    width: "50%",
    margin: "10px auto 30px",
  },
}))

export default useStyles
