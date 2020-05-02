import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import useStyles from "./style"

const Loading = () => {
  const classes = useStyles()

  return (
    <div className={classes.loadContainer}>
      <CircularProgress size="100px" thickness={1} className={classes.loader} />
    </div>
  )
}

export default Loading
