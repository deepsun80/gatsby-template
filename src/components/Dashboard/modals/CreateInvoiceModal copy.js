import React, { useState } from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import Typography from "@material-ui/core/Typography"
import CurrencyTextField from "@unicef/material-ui-currency-textfield"
import useStyles from "../style"

const CreateInvoiceModal = ({
  onClose,
  open,
  header,
  validationMessage,
  handleCreate,
}) => {
  const classes = useStyles()

  const [values, setValues] = useState({
    amount: "",
    description: "",
  })

  const handleAmtChange = (event, maskedvalue) => {
    setValues({
      ...values,
      amount: maskedvalue,
    })
  }

  const handleDescChange = event => {
    setValues({
      ...values,
      description: event.target.value,
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const data = {
      amount: parseFloat(values.amount) * 100,
      description: values.description,
    }

    handleCreate(data)
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="form-modal"
      open={open}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-modal" className={classes.modalHeaderSection}>
        <Typography
          variant="body1"
          color="primary"
          className={classes.modalHeader}
        >
          {header}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <CurrencyTextField
            fullWidth
            textAlign="left"
            label="Invoice Amount"
            variant="outlined"
            value={values.amount}
            currencySymbol="$"
            outputFormat="string"
            decimalCharacter="."
            digitGroupSeparator=","
            onChange={handleAmtChange}
            style={{ margin: "30px auto" }}
          />
          <TextField
            id="description"
            variant="outlined"
            label="Invoice Description"
            name="description"
            fullWidth
            onChange={handleDescChange}
            style={{ marginBottom: 30 }}
          />

          {(values.amount === "" || values.description === "") && (
            <Typography variant="body2" className={classes.error}>
              {validationMessage}
            </Typography>
          )}

          <Button
            variant="contained"
            color="secondary"
            type="submit"
            value="Submit"
            disabled={values.amount === "" || values.description === ""}
          >
            submit
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

CreateInvoiceModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  validationMessage: PropTypes.string.isRequired,
  handleCreate: PropTypes.func.isRequired,
}

export default CreateInvoiceModal
