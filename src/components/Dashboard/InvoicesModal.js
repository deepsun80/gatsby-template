import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications"
import CircularProgress from "@material-ui/core/CircularProgress"
import useStyles from "./style"

function InvoicesModal({ onClose, open, data, header, loading }) {
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
      {loading && (
        <div className={classes.modalLoader}>
          <CircularProgress color="secondary" size="100px" thickness={1} />
        </div>
      )}
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
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeader}>
                  Amount Due
                </TableCell>
                <TableCell className={classes.tableHeader}>
                  Amount Paid
                </TableCell>
                <TableCell className={classes.tableHeader}>
                  View Details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <TableRow key={row.id} hover>
                  <TableCell className={classes.tableBody}>
                    {(row.amount_due / 100).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                  <TableCell className={classes.tableBody}>
                    {(row.amount_paid / 100).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                  <TableCell>
                    <SettingsApplicationsIcon className={classes.icon} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

InvoicesModal.defaultProps = {
  data: [],
  header: "",
}

InvoicesModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.array,
  header: PropTypes.string,
  loading: PropTypes.bool.isRequired,
}

export default InvoicesModal
