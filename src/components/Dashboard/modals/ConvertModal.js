import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import useStyles from "../style"

function ConvertModal({ onClose, open, handleConvert, header }) {
  const classes = useStyles()

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="convert-modal"
      open={open}
      fullWidth
      maxWidth="sm"
    >
      <DialogContent>
        <DialogContentText variant="body1" className={classes.modalBody}>
          {header}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            handleConvert()
            handleClose()
          }}
          className={classes.button}
        >
          Yes
        </Button>
        <Button
          variant="outlined"
          onClick={handleClose}
          className={classes.buttonDark}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConvertModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleConvert: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
}

export default ConvertModal
