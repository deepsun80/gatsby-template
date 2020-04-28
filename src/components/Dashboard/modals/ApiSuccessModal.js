import React, { useRef } from "react"
import PropTypes from "prop-types"
import Portal from "@material-ui/core/Portal"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"

const ApiSuccessModal = ({ open, message, handleClose }) => {
  const container = useRef(null)

  return (
    <Portal container={container.current}>
      <Snackbar
        open={open}
        autoHideDuration={1800}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={handleClose}
      >
        <MuiAlert elevation={6} severity="success">
          {message}
        </MuiAlert>
      </Snackbar>
    </Portal>
  )
}

ApiSuccessModal.defaultProps = {
  message: "",
}

ApiSuccessModal.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
}

export default ApiSuccessModal
