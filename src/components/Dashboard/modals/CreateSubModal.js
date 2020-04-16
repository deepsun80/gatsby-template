import React, { useState } from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
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
import Select from "@material-ui/core/Select"
import useStyles from "../style"

const CreateSubModal = ({ data, onClose, open, header, handleCreate }) => {
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
        <Typography variant="body1" className={classes.modalHeader}>
          {header}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="primary">
          Select all services to add to subscription
        </Typography>
        <Grid container className={classes.invoiceGrid}>
          <Grid item xs={6}>
            <FormControl
              className={classes.formControl}
              fullWidth
              onSubmit={handleSubmit}
            >
              <Select
                id="subscription_plans"
                multiple
                value={values}
                onChange={handleChange}
                input={<OutlinedInput />}
                style={{ height: "40px" }}
                className={classes.createInvoiceSelectField}
              >
                {data.length > 0 &&
                  data.map(sub => (
                    <MenuItem
                      key={sub.id}
                      value={{
                        plan: sub.id,
                        nickname: sub.nickname,
                      }}
                    >
                      {sub.nickname}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Box className={classes.invoiceBox}>
              <Typography
                variant="body2"
                align="center"
                className={classes.invoiceSmallHeader}
              >
                Subscription Items
              </Typography>
              {values.length > 0 &&
                values.map((value, index) => (
                  <ul key={index} className={classes.invoiceList}>
                    <li>
                      <Typography
                        key={index}
                        variant="body2"
                        className={classes.invoiceSmallBody}
                      >
                        {value.nickname}
                      </Typography>
                    </li>
                  </ul>
                ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={handleClear}
          className={classes.button}
        >
          clear
        </Button>
        <Button
          variant="outlined"
          className={classes.buttonDark}
          type="submit"
          disabled={values.length <= 0}
          onClick={handleSubmit}
        >
          submit
        </Button>
        <div className={classes.grow} />
        <Button
          variant="outlined"
          onClick={handleClose}
          className={classes.button}
        >
          close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

CreateSubModal.propTypes = {
  data: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  handleCreate: PropTypes.func.isRequired,
}

export default CreateSubModal
