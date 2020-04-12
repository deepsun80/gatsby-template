import React from "react"
import PropTypes from "prop-types"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"

const ApiSuccessModal = ({ open, message, handleClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={1300}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      onClose={handleClose}
    >
      <MuiAlert elevation={6} severity="success">
        {message}
      </MuiAlert>
    </Snackbar>
  )
}

ApiSuccessModal.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default ApiSuccessModal
