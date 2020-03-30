import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import useStyles from "../style"

function DeleteModal({ onClose, open, handleDelete, header }) {
  const classes = useStyles()

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="delete-modal"
      open={open}
      fullWidth
      maxWidth="sm"
    >
      <DialogContent>
        <DialogContentText
          variant="body1"
          color="primary"
          className={classes.modalBody}
        >
          {header}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            handleDelete()
            handleClose()
          }}
          color="secondary"
        >
          Yes
        </Button>
        <Button variant="contained" onClick={handleClose} color="secondary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}

DeleteModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
}

export default DeleteModal
