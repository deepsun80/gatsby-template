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
import Link from "@material-ui/core/Link"
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import BlockIcon from "@material-ui/icons/Block"
import useStyles from "../style"

function InvoicesModal({
  onClose,
  open,
  data,
  header,
  handleDelete,
  handleSend,
  handleVoid,
}) {
  const classes = useStyles()

  const handleClose = () => {
    onClose()
  }

  const deleteInvoice = id => {
    handleDelete(id)
  }

  const sendInvoice = id => {
    handleSend(id)
  }

  const voidInvoice = id => {
    handleVoid(id)
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="invoices-modal"
      open={open}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="invoices-modal" className={classes.modalHeaderSection}>
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
                <TableCell className={classes.tableHeader}>Status</TableCell>
                <TableCell className={classes.tableHeader}>View</TableCell>
                <TableCell className={classes.tableHeader}>Send</TableCell>
                <TableCell className={classes.tableHeader}>Delete</TableCell>
                <TableCell className={classes.tableHeader}>Void</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <TableRow key={row.id} hover>
                  <TableCell
                    className={
                      row.status === "void"
                        ? classes.tableBodyDisabled
                        : classes.tableBody
                    }
                  >
                    {(row.amount_due / 100).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                  <TableCell
                    className={
                      row.status === "void"
                        ? classes.tableBodyDisabled
                        : classes.tableBody
                    }
                  >
                    {(row.amount_paid / 100).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                  <TableCell
                    style={
                      row.status === "draft"
                        ? { color: "steelblue" }
                        : row.status === "open"
                        ? { color: "green" }
                        : row.status === "paid"
                        ? { color: "blue" }
                        : { color: "red" }
                    }
                  >
                    {row.status}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={row.hosted_invoice_url}
                      target="_blank"
                      rel="noopener"
                    >
                      <SettingsApplicationsIcon
                        className={
                          row.attempted || row.status === "void"
                            ? classes.icon
                            : classes.disabledIcon
                        }
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <ExitToAppIcon
                      className={
                        row.status === "void"
                          ? classes.disabledIcon
                          : classes.icon
                      }
                      onClick={() => {
                        if (row.status !== "void") sendInvoice(row.id)
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteForeverIcon
                      className={
                        row.status === "void" || row.status !== "draft"
                          ? classes.disabledIcon
                          : classes.icon
                      }
                      onClick={() => {
                        if (row.status !== "void" && row.status === "draft")
                          deleteInvoice(row.id)
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <BlockIcon
                      className={
                        row.status === "void" || row.status === "draft"
                          ? classes.disabledIcon
                          : classes.icon
                      }
                      onClick={() => {
                        if (row.status !== "void" && row.status !== "draft")
                          voidInvoice(row.id)
                      }}
                    />
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
  handleDelete: PropTypes.func.isRequired,
  handleSend: PropTypes.func.isRequired,
  handleVoid: PropTypes.func.isRequired,
}

export default InvoicesModal
