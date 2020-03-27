import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import IconButton from "@material-ui/core/IconButton"
import ViewListIcon from "@material-ui/icons/ViewList"
import useStyles from "./style"

function ClientModal({
  onClose,
  open,
  data,
  header,
  getInvoices,
  setInvoiceName,
  invoicesModalOpen,
}) {
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
          variant="body1"
          color="primary"
          className={classes.modalHeader}
        >
          {header}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <DialogContentText
              variant="body2"
              color="primary"
              className={classes.modalBody}
            >
              <span className={classes.modalLabel}>Name</span>: {data.name}
            </DialogContentText>
            {data.customer && (
              <DialogContentText
                variant="body2"
                color="primary"
                className={classes.modalBody}
              >
                <span className={classes.modalLabel}>Address</span>:{" "}
                {data.address}
              </DialogContentText>
            )}
            <DialogContentText
              variant="body2"
              color="primary"
              className={classes.modalBody}
            >
              <span className={classes.modalLabel}>Phone</span>:{" "}
              <a href={`tel:${data.phone}`}>{data.phone}</a>
            </DialogContentText>
            <DialogContentText
              variant="body2"
              color="primary"
              className={classes.modalBody}
            >
              <span className={classes.modalLabel}>Email</span>:{" "}
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </DialogContentText>
          </Grid>
          <Grid item md={6}>
            <Typography
              variant="body2"
              color="primary"
              className={classes.modalSmallHeader}
            >
              Invoices
            </Typography>
            <div className={classes.flex}>
              <IconButton
                color="secondary"
                aria-label="reset"
                component="span"
                onClick={() => {
                  getInvoices(data.stripe_id)
                  setInvoiceName(data.name)
                  invoicesModalOpen(true)
                }}
              >
                <ViewListIcon />
              </IconButton>
              <IconButton color="secondary" aria-label="reset" component="span">
                <ViewListIcon />
              </IconButton>
              <IconButton color="secondary" aria-label="reset" component="span">
                <ViewListIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ClientModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  getInvoices: PropTypes.func.isRequired,
  setInvoiceName: PropTypes.func.isRequired,
  invoicesModalOpen: PropTypes.func.isRequired,
}

export default ClientModal
