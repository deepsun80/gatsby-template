import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import useStyles from "./style"

function Modal({ onClose, open, data }) {
  const classes = useStyles()

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="modal-title"
      open={open}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="modal-title" className={classes.modalHeaderSection}>
        <Typography
          variant="body2"
          color="primary"
          className={classes.modalHeader}
        >
          Customer Details
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography
            variant="body2"
            color="primary"
            className={classes.modalBody}
          >
            <span className={classes.modalLabel}>Name</span>: {data.name}
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            className={classes.modalBody}
          >
            <span className={classes.modalLabel}>Address</span>: {data.address}
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            className={classes.modalBody}
          >
            <span className={classes.modalLabel}>Phone</span>: {data.phone}
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            className={classes.modalBody}
          >
            <span className={classes.modalLabel}>Email</span>: {data.email}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
}

export default Modal
