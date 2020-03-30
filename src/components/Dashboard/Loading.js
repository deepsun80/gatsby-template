import React from "react"
import PropTypes from "prop-types"
import Dialog from "@material-ui/core/Dialog"
import CircularProgress from "@material-ui/core/CircularProgress"
import useStyles from "./style"

const Loading = ({ loading }) => {
  const classes = useStyles()

  return (
    <Dialog open={loading} fullScreen className="loadModal">
      <CircularProgress size="100px" thickness={1} className={classes.loader} />
    </Dialog>
  )
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
}

export default Loading
