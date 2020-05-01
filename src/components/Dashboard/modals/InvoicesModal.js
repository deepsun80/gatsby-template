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
import SendIcon from "@material-ui/icons/Send"
import BlockIcon from "@material-ui/icons/Block"
import moment from "moment"
import Loading from "../Loading"
import useStyles from "../style"

function InvoicesModal({
  onClose,
  open,
  data,
  header,
  handleDelete,
  handleSend,
  handleVoid,
  handleInvReminder,
  loading,
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

  const sendSms = data => {
    handleInvReminder(data)
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="invoices-modal"
      open={open}
      fullWidth
      maxWidth="lg"
    >
      {/* ---Loading UI --- */}
      {loading && <Loading modal />}

      <DialogTitle id="invoices-modal" className={classes.modalHeaderSection}>
        <Typography variant="body1" className={classes.modalHeader}>
          {header}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeader}>Date</TableCell>
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
                <TableCell className={classes.tableHeader}>Sms</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <TableRow key={row.id} hover selected={row.status === "void"}>
                  <TableCell>
                    <Typography variant="body2">
                      {moment.unix(row.created).format("MM/DD/YYYY")}
                    </Typography>
                  </TableCell>
                  <TableCell
                    style={row.status === "void" ? { opacity: 0.4 } : null}
                  >
                    <Typography variant="body2">
                      {(row.amount_due / 100).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </Typography>
                  </TableCell>
                  <TableCell
                    style={row.status === "void" ? { opacity: 0.4 } : null}
                  >
                    <Typography variant="body2">
                      {(row.amount_paid / 100).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </Typography>
                  </TableCell>
                  <TableCell
                    style={
                      row.status === "draft"
                        ? { color: "cornflowerblue" }
                        : row.status === "paid"
                        ? { color: "green" }
                        : row.status === "open"
                        ? { color: "dodgerblue" }
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
                          row.status !== "uncollectible" &&
                          row.status !== "draft"
                            ? classes.icon
                            : classes.disabledIcon
                        }
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <ExitToAppIcon
                      className={
                        row.status === "void" || row.status === "paid"
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
                        row.status === "void" ||
                        row.status === "draft" ||
                        row.status === "paid"
                          ? classes.disabledIcon
                          : classes.icon
                      }
                      onClick={() => {
                        if (
                          row.status !== "void" &&
                          row.status !== "draft" &&
                          row.status !== "paid"
                        )
                          voidInvoice(row.id)
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <SendIcon
                      className={
                        row.status !== "open"
                          ? classes.disabledIcon
                          : classes.icon
                      }
                      onClick={() => {
                        if (row.status === "open") {
                          sendSms(row.hosted_invoice_url)
                          handleClose()
                        }
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
        <Button
          variant="outlined"
          onClick={handleClose}
          className={classes.button}
        >
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
  handleInvReminder: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default InvoicesModal
