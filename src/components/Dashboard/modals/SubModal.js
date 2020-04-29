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
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import useStyles from "../style"

function SubModal({ onClose, open, data, header, handleDelete }) {
  const classes = useStyles()

  const handleClose = () => {
    onClose()
  }

  const cancelSub = id => {
    handleDelete(id)
  }

  console.log(data)
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="subscription-modal"
      open={open}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle
        id="subscription-modal"
        className={classes.modalHeaderSection}
      >
        <Typography variant="body1" className={classes.modalHeader}>
          {header}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {data.map((sub, index) => (
          <TableContainer key={sub.id}>
            <div className={classes.flexResponsive}>
              <Typography variant="body2" className={classes.modalLabelHigh}>
                Subscription {index + 1}
              </Typography>
              {sub.status === "trialing" &&
                sub.status === "active" &&
                sub.status === "past_due" && (
                  <Tooltip title="Cancel subscription" arrow>
                    <IconButton
                      className={classes.iconPrimary}
                      aria-label="delete"
                      component="span"
                      onClick={() => cancelSub(sub.id)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Tooltip>
                )}
            </div>

            <TableContainer className={classes.subBox}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHeader}>Name</TableCell>
                    <TableCell className={classes.tableHeader}>
                      Amount
                    </TableCell>
                    <TableCell className={classes.tableHeader}>
                      Frequency
                    </TableCell>
                    <TableCell className={classes.tableHeader}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sub.items.data.map(row => (
                    <TableRow key={row.id} hover>
                      <TableCell>
                        <Typography variant="body2">
                          {row.plan.nickname}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {(row.plan.amount / 100).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {row.plan.interval}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          style={
                            sub.status === "active"
                              ? { color: "green" }
                              : row.status === "trialing"
                              ? { color: "cornflowerblue" }
                              : { color: "red" }
                          }
                        >
                          {sub.status}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TableContainer>
        ))}
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

SubModal.defaultProps = {
  data: [],
  header: "",
}

SubModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.array,
  header: PropTypes.string,
  handleDelete: PropTypes.func.isRequired,
}

export default SubModal
