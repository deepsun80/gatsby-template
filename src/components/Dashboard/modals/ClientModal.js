import React from "react"
import PropTypes from "prop-types"
import Tooltip from "@material-ui/core/Tooltip"
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
import AddBoxIcon from "@material-ui/icons/AddBox"
import Loading from "../Loading"
import useStyles from "../style"

function ClientModal({
  onClose,
  open,
  data,
  header,
  getInvoices,
  getSubs,
  setInvoiceName,
  invoicesModalOpen,
  subModalOpen,
  handleInvFormModalOpen,
  handleSubFormModalOpen,
  loading,
}) {
  const classes = useStyles()

  const handleClose = () => {
    onClose()
  }

  const invoiceFormOpen = () => {
    handleInvFormModalOpen()
  }

  const subscriptionFormOpen = () => {
    handleSubFormModalOpen()
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="client-modal"
      open={open}
      fullWidth
      maxWidth={data.customer ? "lg" : "md"}
    >
      {/* ---Loading UI --- */}
      {loading && <Loading />}

      <DialogTitle id="client-modal" className={classes.modalHeaderSection}>
        <Typography variant="body1" className={classes.modalHeader}>
          {header}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <DialogContentText variant="body2" className={classes.modalBody}>
              <span className={classes.modalLabel}>Name</span>: {data.name}
            </DialogContentText>
            {data.customer && (
              <DialogContentText variant="body2" className={classes.modalBody}>
                <span className={classes.modalLabel}>Address</span>:{" "}
                {data.address}
              </DialogContentText>
            )}
            <DialogContentText variant="body2" className={classes.modalBody}>
              <span className={classes.modalLabel}>Phone</span>:{" "}
              <a href={`tel:${data.phone}`} className={classes.link}>
                {data.phone}
              </a>
            </DialogContentText>
            <DialogContentText variant="body2" className={classes.modalBody}>
              <span className={classes.modalLabel}>Email</span>:{" "}
              <a href={`mailto:${data.email}`} className={classes.link}>
                {data.email}
              </a>
            </DialogContentText>
          </Grid>
          {data.customer && (
            <Grid item md={6} xs={12}>
              <Typography variant="body2" className={classes.modalSmallHeader}>
                Invoices
              </Typography>
              <div className={classes.flex}>
                <Tooltip title="View all invoices" arrow>
                  <IconButton
                    className={classes.iconPrimary}
                    aria-label="submit"
                    component="span"
                    onClick={() => {
                      getInvoices(data.stripe_id)
                      setInvoiceName(data.name)
                      invoicesModalOpen(true)
                    }}
                  >
                    <ViewListIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Create invoice, Warning: not for appointments"
                  arrow
                >
                  <IconButton
                    className={classes.iconPrimary}
                    aria-label="submit"
                    component="span"
                    onClick={invoiceFormOpen}
                  >
                    <AddBoxIcon />
                  </IconButton>
                </Tooltip>
              </div>

              <Typography variant="body2" className={classes.modalSmallHeader}>
                Subscriptions
              </Typography>
              <div className={classes.flex}>
                <Tooltip title="View all subscriptions" arrow>
                  <IconButton
                    className={classes.iconPrimary}
                    aria-label="submit"
                    component="span"
                    onClick={() => {
                      getSubs(data.stripe_id)
                      setInvoiceName(data.name)
                      subModalOpen(true)
                    }}
                  >
                    <ViewListIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Create subscription" arrow>
                  <IconButton
                    className={classes.iconPrimary}
                    aria-label="submit"
                    component="span"
                    onClick={subscriptionFormOpen}
                  >
                    <AddBoxIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={handleClose}
          className={classes.iconPrimary}
        >
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
  getSubs: PropTypes.func.isRequired,
  setInvoiceName: PropTypes.func.isRequired,
  invoicesModalOpen: PropTypes.func.isRequired,
  subModalOpen: PropTypes.func.isRequired,
  handleInvFormModalOpen: PropTypes.func.isRequired,
  handleSubFormModalOpen: PropTypes.func.isRequired,
  handleSuccessApiOpen: PropTypes.func.isRequired,
  setApiSuccessMessage: PropTypes.func.isRequired,
  handleErrorApiOpen: PropTypes.func.isRequired,
  setApiErrorMessage: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default ClientModal
