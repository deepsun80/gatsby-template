import React, { useState } from "react"
import PropTypes from "prop-types"
import BackgroundImage from "gatsby-background-image"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputLabel from "@material-ui/core/InputLabel"
import TextMaskCustom from "./TextMaskCustom"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"
import faunaApi from "../../utils/faunaApi"
import validateEmail from "../../utils/validateEmail"
import isLocalHost from "../../utils/isLocalHost"
import Fade from "react-reveal/Fade"
import useStyles from "./style"

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const Contact = ({
  header,
  subHeader,
  successMessage,
  errorMessage,
  validationMessage,
  emailMessage,
  localHostError,
  liveError,
  image,
}) => {
  const classes = useStyles()

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "(   )   -    ",
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
  const [loading, setLoading] = useState(false)

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    setLoading(true)

    const response = await faunaApi.searchClients(values.email)

    if (response.message === "unauthorized") {
      if (isLocalHost()) {
        alert(localHostError)
      } else {
        alert(liveError)
      }
      setLoading(false)
      setValidation({ success: false, error: true })
      return false
    }

    if (response.result.hasOwnProperty("data")) {
      try {
        const res = await faunaApi.updateClient(
          response.result.ref["@ref"].id,
          {
            name: values.name,
            email: values.email,
            phone: values.phone,
          }
        )
        console.log(res.message)
        setValidation({ success: true, error: false })
      } catch (err1) {
        console.log(err1.message)
        setValidation({ success: false, error: true })
      }
      setLoading(false)
    } else {
      try {
        const ret = await faunaApi.createClient({
          name: values.name,
          email: values.email,
          phone: values.phone,
          customer: false,
        })
        console.log(ret.message)
        setValidation({ success: true, error: false })
      } catch (err2) {
        console.log(err2.message)
        setValidation({ success: false, error: true })
      }
      setLoading(false)
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
      <BackgroundImage
        Tag="section"
        alt="hero image"
        title="hero image"
        style={{
          backgroundSize: "contain",
          backgroundPosition: "bottom right",
        }}
        fluid={image.fluid}
      >
        <Container className={classes.container}>
          <Fade duration={1600} ssrFadeout>
            <Typography variant="h3" align="center" className={classes.header}>
              {header}
            </Typography>
            <Typography
              variant="body1"
              align="center"
              className={classes.subHeader}
            >
              {subHeader}
            </Typography>
          </Fade>
          {loading && (
            <div className={classes.loader}>
              <CircularProgress color="secondary" size="100px" thickness={1} />
            </div>
          )}
          <Paper elevation={1} className={classes.paper}>
            <>
              {!validation.success &&
                !validation.error &&
                !message.success &&
                !message.error && (
                  <form
                    name="website-contact-form"
                    method="post"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                  >
                    {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                    <input
                      type="hidden"
                      name="form-name"
                      value="website-contact-form"
                    />
                    <p hidden>
                      <label>
                        Don’t fill this out:{" "}
                        <input name="bot-field" onChange={handleChange} />
                      </label>
                    </p>
                    <TextField
                      id="name"
                      variant="outlined"
                      label="Full Name"
                      name="name"
                      color="secondary"
                      fullWidth
                      onChange={handleChange}
                      className={classes.field}
                    />
                    <Grid container spacing={1}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          id="email"
                          variant="outlined"
                          label="Email"
                          name="email"
                          color="secondary"
                          fullWidth
                          onChange={handleChange}
                          className={classes.field}
                        />

                        {!validateEmail(values.email) && (
                          <Typography
                            variant="body2"
                            className={classes.validationMessage}
                          >
                            {emailMessage}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <FormControl
                          fullWidth
                          className={classes.field}
                          color="secondary"
                        >
                          <InputLabel htmlFor="phone">Phone Number</InputLabel>
                          <OutlinedInput
                            value={values.phone}
                            onChange={handleChange}
                            name="phone"
                            id="phone"
                            inputComponent={TextMaskCustom}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>

                    <TextField
                      id="message"
                      variant="outlined"
                      label="Message/Question"
                      name="message"
                      color="secondary"
                      multiline
                      fullWidth
                      onChange={handleChange}
                      className={classes.field}
                    />

                    {(values.name === "" ||
                      values.email === "" ||
                      values.phone === "" ||
                      values.message === "") && (
                      <Typography
                        variant="body2"
                        className={classes.validationMessage}
                      >
                        {validationMessage}
                      </Typography>
                    )}

                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      value="Submit"
                      disabled={
                        loading ||
                        values.name === "" ||
                        values.email === "" ||
                        values.phone === "" ||
                        values.message === ""
                      }
                      className={classes.button}
                    >
                      submit
                    </Button>
                  </form>
                )}

              {validation.success && message.success && (
                <Typography
                  variant="body1"
                  align="center"
                  className={classes.successMessage}
                >
                  {successMessage}
                </Typography>
              )}

              {(validation.error || message.error) && (
                <Typography
                  variant="body1"
                  align="center"
                  className={classes.errorMessage}
                >
                  {errorMessage}
                </Typography>
              )}
            </>
          </Paper>
        </Container>
      </BackgroundImage>
    </section>
  )
}

Contact.defaultProps = {
  image: {},
}

Contact.propTypes = {
  header: PropTypes.string.isRequired,
  subHeader: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  validationMessage: PropTypes.string.isRequired,
  emailMessage: PropTypes.string.isRequired,
  localHostError: PropTypes.string.isRequired,
  liveError: PropTypes.string.isRequired,
  image: PropTypes.object,
}

export default Contact
