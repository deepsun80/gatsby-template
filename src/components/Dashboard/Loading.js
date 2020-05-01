import React from "react"
import PropTypes from "prop-types"
import CircularProgress from "@material-ui/core/CircularProgress"
import useStyles from "./style"

const Loading = ({ modal }) => {
  const classes = useStyles()

  return (
    <div
      className={classes.loadContainer}
      style={modal ? { top: "15vh" } : { top: "35vh" }}
    >
      <CircularProgress size="100px" thickness={1} className={classes.loader} />
    </div>
  )
}

Loading.defaultProps = {
  modal: false,
}

Loading.propTypes = {
  modal: PropTypes.bool,
}

export default Loading
