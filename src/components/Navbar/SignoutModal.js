import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import useStyles from "./style"

function SignoutModal({ onClose, open, header, logout }) {
  const classes = useStyles()

  const handleLogout = async () => {
    await logout()
    onClose()
  }

  const handleClose = async () => {
    onClose()
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="modal-title"
      open={open}
      fullWidth
      maxWidth="sm"
    >
      <DialogContent>
        <DialogContentText>
          <Typography
            variant="body1"
            color="primary"
            className={classes.modalBody}
          >
            {header}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleLogout} color="secondary">
          Yes
        </Button>
        <Button variant="contained" onClick={handleClose} color="secondary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}

SignoutModal.defaultProps = {
  logout: () => {},
}

SignoutModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  logout: PropTypes.func,
}

export default SignoutModal
