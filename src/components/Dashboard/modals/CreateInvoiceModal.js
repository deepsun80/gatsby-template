import React, { useState } from "react"
import PropTypes from "prop-types"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import Typography from "@material-ui/core/Typography"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import useStyles from "../style"

const CreateInvoiceModal = ({ data, onClose, open, header, handleCreate }) => {
  const classes = useStyles()

  const [values, setValues] = useState([])

  const handleChange = event => {
    setValues(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    handleCreate(values)
    onClose()
  }

  const handleClose = () => {
    setValues([])
    onClose()
  }

  const handleClear = () => {
    setValues([])
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
        <Box className={classes.box}>
          {values.length > 0 &&
            values.map((value, index) => (
              <ul key={index}>
                <li>
                  <Typography
                    key={index}
                    variant="body2"
                    color="primary"
                    className={classes.modalSmallHeader}
                  >
                    {value.description} -{" "}
                    <span className={classes.modalSmallHeaderSpan}>
                      {(value.amount / 100).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </Typography>
                </li>
              </ul>
            ))}
        </Box>
        <FormControl
          className={classes.formControl}
          fullWidth
          onSubmit={handleSubmit}
        >
          <InputLabel id="services-label" style={{ paddingLeft: 10 }}>
            Select all services to add to invoice
          </InputLabel>
          <Select
            labelId="services-label"
            id="services"
            multiple
            value={values}
            onChange={handleChange}
            input={<OutlinedInput />}
          >
            {data.length > 0 &&
              data.map(sku => (
                <MenuItem
                  key={sku.id}
                  value={{
                    amount: sku.price,
                    description: sku.attributes.name,
                  }}
                  color="primary"
                >
                  {sku.attributes.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClear} color="secondary">
          clear
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          disabled={values.length <= 0}
          onClick={handleSubmit}
        >
          submit
        </Button>
        <div className={classes.grow} />
        <Button variant="outlined" onClick={handleClose} color="secondary">
          close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

CreateInvoiceModal.propTypes = {
  data: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  handleCreate: PropTypes.func.isRequired,
}

export default CreateInvoiceModal
