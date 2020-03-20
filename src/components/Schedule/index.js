import React, { useState } from "react"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Fade from "react-reveal/Fade"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import TextMaskCustom from "./TextMaskCustom"
import Button from "@material-ui/core/Button"
import api from "../../utils/api"
import isLocalHost from "../../utils/isLocalHost"
import useStyles from "./style"
import { Typography } from "@material-ui/core"

const Schedule = () => {
  const classes = useStyles()

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "(1  )    -    ",
    address: "",
  })
  const [validation, setValidation] = useState({
    success: false,
    error: false,
  })

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const response = await api.search(values.email)

    if (response.message === "unauthorized") {
      if (isLocalHost()) {
        alert(
          "FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info"
        )
      } else {
        alert(
          "FaunaDB key is not unauthorized. Verify the key `FAUNADB_SERVER_SECRET` set in Netlify enviroment variables is correct"
        )
      }
      return false
    }

    if (response.hasOwnProperty("data")) {
      try {
        const res = await api.update(response.ref["@ref"].id, values)
        console.log("client updated:", res)
        setValidation({ success: true, error: false })
      } catch (err1) {
        console.log("An API error occurred", err1)
        setValidation({ success: false, error: true })
      }
    } else {
      try {
        const ret = await api.create(values)
        console.log("new client added:", ret)
        setValidation({ success: true, error: false })
      } catch (err2) {
        console.log("An API error occurred", err2)
        setValidation({ success: false, error: true })
      }
    }
  }

  return (
    <section>
      <Container className={classes.container}>
        <Paper elevation={1} className={classes.paper}>
          <Fade duration={1500} ssrFadeout>
            <form onSubmit={handleSubmit}>
              <TextField
                id="standard-basic"
                label="Full Name"
                name="name"
                fullWidth
                onChange={handleChange}
                className={classes.field}
              />
              <TextField
                id="standard-basic"
                label="Email"
                name="email"
                fullWidth
                onChange={handleChange}
                className={classes.field}
              />
              <FormControl fullWidth className={classes.field}>
                <InputLabel htmlFor="phone">Phone Number</InputLabel>
                <Input
                  value={values.phone}
                  onChange={handleChange}
                  name="phone"
                  id="phone"
                  inputComponent={TextMaskCustom}
                />
              </FormControl>
              <TextField
                id="standard-basic"
                label="Address"
                name="address"
                fullWidth
                onChange={handleChange}
                className={classes.field}
              />
              {validation.success && (
                <Typography
                  variant="caption"
                  className={classes.successMessage}
                >
                  Thank you for scheduling with us. We will get back to you
                  shortly.
                </Typography>
              )}
              {validation.error && (
                <Typography variant="caption" className={classes.errorMessage}>
                  Something went wrong, please try again or give us a call.
                </Typography>
              )}
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                value="Submit"
                className={classes.button}
              >
                submit
              </Button>
            </form>
          </Fade>
        </Paper>
      </Container>
    </section>
  )
}

export default Schedule
