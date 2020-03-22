import React, { useState } from "react"
import PropTypes from "prop-types"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Fade from "react-reveal/Fade"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import TextMaskCustom from "./TextMaskCustom"
import Button from "@material-ui/core/Button"
import { AiOutlineLeft } from "react-icons/ai"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import api from "../../utils/api"
import isLocalHost from "../../utils/isLocalHost"
import useStyles from "./style"
import { Typography } from "@material-ui/core"

const encode = data => {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&")
}

const Contact = ({ successMessage, errorMessage }) => {
  const classes = useStyles()

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "(1  )    -    ",
    message: "",
  })
  const [validation, setValidation] = useState({
    success: false,
    error: false,
  })
  const [message, setMessage] = useState({
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
        const res = await api.update(response.ref["@ref"].id, {
          name: values.name,
          email: values.email,
          phone: values.phone,
          customer: false,
        })
        console.log("client updated:", res)
        setValidation({ success: true, error: false })
      } catch (err1) {
        console.log("An API error occurred", err1)
        setValidation({ success: false, error: true })
      }
    } else {
      try {
        const ret = await api.create({
          name: values.name,
          email: values.email,
          phone: values.phone,
          customer: false,
        })
        console.log("new client added:", ret)
        setValidation({ success: true, error: false })
      } catch (err2) {
        console.log("An API error occurred", err2)
        setValidation({ success: false, error: true })
      }
    }

    const result = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "website-contact-form",
        ...values,
      }),
    })

    if (result.status === 200) setMessage({ success: true, error: false })
    else setMessage({ success: false, error: true })
  }

  return (
    <section className={classes.section}>
      <Container className={classes.container}>
        <Paper elevation={1} className={classes.paper}>
          <Fade duration={1500} ssrFadeout>
            <>
              {!validation.success &&
                !validation.error &&
                !message.success &&
                !message.error && (
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
                      label="Message/Question"
                      name="message"
                      multiline
                      fullWidth
                      onChange={handleChange}
                      className={classes.field}
                    />
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
                )}

              {validation.success && message.success && (
                <>
                  <Typography
                    variant="body1"
                    align="center"
                    className={classes.successMessage}
                  >
                    {successMessage}
                  </Typography>
                  <AniLink fade to="/" className={classes.link}>
                    <AiOutlineLeft className={classes.icon} />
                    <Typography
                      variant="body2"
                      color="primary"
                      className={classes.iconText}
                    >
                      home
                    </Typography>
                  </AniLink>
                </>
              )}

              {(validation.error || message.error) && (
                <>
                  <Typography
                    variant="body1"
                    align="center"
                    className={classes.errorMessage}
                  >
                    {errorMessage}
                  </Typography>
                  <AniLink fade to="/" className={classes.link}>
                    <AiOutlineLeft className={classes.icon} />
                    <Typography
                      variant="body2"
                      color="primary"
                      className={classes.iconText}
                    >
                      home
                    </Typography>
                  </AniLink>
                </>
              )}
            </>
          </Fade>
        </Paper>
      </Container>
    </section>
  )
}

Contact.propTypes = {
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
}

export default Contact
