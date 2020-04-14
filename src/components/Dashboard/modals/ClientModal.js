import React, { useState, useEffect } from "react"
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
import faunaApi from "../../../utils/faunaApi"
import moment from "moment"
import useStyles from "../style"

function ClientModal({
  onClose,
  open,
  data,
  header,
  getInvoices,
  setInvoiceName,
  invoicesModalOpen,
  handleFormModalOpen,
  handleSuccessApiOpen,
  setApiSuccessMessage,
  handleErrorApiOpen,
  setApiErrorMessage,
  setLoading,
}) {
  const classes = useStyles()

  const [appt, setAppt] = useState({})

  const handleClose = () => {
    onClose()
  }

  const invoiceFormOpen = () => {
    handleFormModalOpen()
  }

  useEffect(() => {
    // ---Get appointment for client from Fauna ---
    const getAppts = async () => {
      setLoading(true)

      try {
        const response = await faunaApi.searchAppts(data.email)

        if (response.message) {
          console.log(response.message)
          setApiSuccessMessage(response.message)
          handleSuccessApiOpen()
        }

        setAppt(response.result)
      } catch (error) {
        console.log(error.error)
        setApiErrorMessage(error.error)
        handleErrorApiOpen()
      }

      setLoading(false)
    }

    getAppts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLoading, data.email])

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="client-modal"
      open={open}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="client-modal" className={classes.modalHeaderSection}>
        <Typography variant="body1" className={classes.modalHeader}>
          {header}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item md={6}>
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
          <Grid item md={6}>
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
              <Tooltip title="Create invoice" arrow>
                <IconButton
                  className={classes.iconPrimary}
                  aria-label="submit"
                  component="span"
                  onClick={invoiceFormOpen}
                >
                  <AddBoxIcon />
                </IconButton>
              </Tooltip>
              <IconButton aria-label="submit" component="span">
                {/* <ViewListIcon /> */}
              </IconButton>
            </div>
            {appt.hasOwnProperty("data") && (
              <>
                <Typography
                  variant="body2"
                  className={classes.modalSmallHeader}
                >
                  {moment(appt.data.payload.event.start_time).isBefore()
                    ? "Last Appointment"
                    : "Upcoming Appointment"}
                </Typography>
                <DialogContentText
                  variant="body2"
                  className={classes.modalSecondaryBody}
                >
                  {appt.data.payload.event.start_time_pretty}
                </DialogContentText>
              </>
            )}
          </Grid>
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
  setInvoiceName: PropTypes.func.isRequired,
  invoicesModalOpen: PropTypes.func.isRequired,
  handleFormModalOpen: PropTypes.func.isRequired,
  handleSuccessApiOpen: PropTypes.func.isRequired,
  setApiSuccessMessage: PropTypes.func.isRequired,
  handleErrorApiOpen: PropTypes.func.isRequired,
  setApiErrorMessage: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
}

export default ClientModal
