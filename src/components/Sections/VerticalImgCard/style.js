import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    "&:hover": {
      boxShadow: "0px 1px 8px 0px rgba(0,0,0,0.5)",
    },
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
  button: {
    border: "1px solid #fff",
    "&:hover": {
      border: `1px solid ${theme.palette.secondary.light}`,
    },
  },
}))

export default useStyles
