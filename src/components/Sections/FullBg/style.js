import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    height: "80vh",
  },
  container: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    height: "70vh",
  },
  paper: {
    textAlign: "right",
    padding: "10vh 5vw 5vh",
    width: 800,
    maxWidth: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    border: "1px solid #fff",
  },
  header: {
    color: "#fff",
  },
  headerSpan: {
    textTransform: "capitalize",
    color: theme.palette.secondary.light,
  },
  subtitle: {
    color: "#fff",
    marginTop: "3vh",
    marginBottom: "1vh",
  },
  verticalButton: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s",
    "&:hover": {
      opacity: 0.4,
    },
  },
  icon: {
    fontSize: "3rem",
    color: "#fff",
    marginBottom: "-10px",
    padding: 0,
  },
}))

export default useStyles
