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
import useStyles from "../style"

function SubModal({ onClose, open, data, header }) {
  const classes = useStyles()

  const handleClose = () => {
    onClose()
  }

  // const cancelSub = id => {
  //   console.log(id)
  // }
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
          <div key={sub.id}>
            <Typography variant="body2" className={classes.modalLabel}>
              Subscription {index + 1}
            </Typography>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
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
  // handleDelete: PropTypes.func.isRequired,
}

export default SubModal
