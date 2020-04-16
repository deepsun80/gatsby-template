import React, { useRef } from "react"
import PropTypes from "prop-types"
import Portal from "@material-ui/core/Portal"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"

const ApiErrorModal = ({ open, message, handleClose }) => {
  const container = useRef(null)

  return (
    <Portal container={container.current}>
      <Snackbar
        open={open}
        autoHideDuration={1300}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
      >
        <MuiAlert elevation={6} severity="error">
          {message}
        </MuiAlert>
      </Snackbar>
    </Portal>
  )
}

ApiErrorModal.defaultProps = {
  message: "",
}

ApiErrorModal.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
}

export default ApiErrorModal
