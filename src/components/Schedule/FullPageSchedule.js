import React, { useState } from "react"
import PropTypes from "prop-types"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputLabel from "@material-ui/core/InputLabel"
import TextMaskCustom from "./TextMaskCustom"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import { AiOutlineLeft } from "react-icons/ai"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { InlineWidget } from "react-calendly"
import faunaApi from "../../utils/faunaApi"
import stripeApi from "../../utils/stripeApi"
import validateEmail from "../../utils/validateEmail"
import isLocalHost from "../../utils/isLocalHost"
import useStyles from "./style"
import { Typography } from "@material-ui/core"

const FullPageSchedule = ({
  title,
  successMessage,
  subSuccessMessage,
  errorMessage,
  validationMessage,
  emailMessage,
  localHostError,
  liveError,
}) => {
  const classes = useStyles()

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "(   )   -    ",
    address: "",
  })
  const [validation, setValidation] = useState({
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

    setValidation({ success: true, error: false })
    setLoading(true)

    const response = await faunaApi.searchClients(values.email)

    if (response && response.message === "unauthorized") {
      if (isLocalHost()) {
        alert(localHostError)
      } else {
        alert(liveError)
      }
      setLoading(false)
      setValidation({ success: false, error: true })
      return false
    }

    if (response && response.result.hasOwnProperty("data")) {
      try {
        const ret = await faunaApi.updateClient(
          response.result.ref["@ref"].id,
          {
            ...values,
            stripe_id: response.result.data.stripe_id,
            customer: true,
          }
        )
        console.log(ret.message)

        try {
          const ret2 = await stripeApi.updateClient(
            response.result.data.stripe_id,
            {
              name: values.name,
              email: values.email,
              phone: values.phone,
            }
          )
          console.log(ret2.message)
          setValidation({ success: true, error: false })
        } catch (err) {
          console.log(err.message)
          setValidation({ success: false, error: true })
        }
      } catch (err1) {
        console.log(err1.message)
        setValidation({ success: false, error: true })
      }
      setLoading(false)
    } else {
      try {
        const ret = await stripeApi.createClient(values)
        console.log(ret.message)

        try {
          const ret2 = await faunaApi.createClient({
            ...values,
            stripe_id: ret.result.id,
            customer: true,
          })
          console.log(ret2.message)
          setValidation({ success: true, error: false })
        } catch (err) {
          console.log(err.message)
          setValidation({ success: false, error: true })
        }
      } catch (err1) {
        console.log(err1.message)
        setValidation({ success: false, error: true })
      }
      setLoading(false)
    }
  }

  return (
    <section>
      <Container className={classes.container}>
        {loading && (
          <div className={classes.loader}>
            <CircularProgress color="secondary" size="100px" thickness={1} />
          </div>
        )}
        <Paper elevation={0} className={classes.paper}>
          <>
            {!validation.success && !validation.error && (
              <form onSubmit={handleSubmit}>
                <TextField
                  id="name"
                  variant="outlined"
                  label="Full Name"
                  name="name"
                  fullWidth
                  onChange={handleChange}
                  className={classes.field}
                />
                <TextField
                  id="email"
                  variant="outlined"
                  label="Email"
                  name="email"
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

                <FormControl fullWidth className={classes.field}>
                  <InputLabel htmlFor="phone">Phone Number</InputLabel>
                  <OutlinedInput
                    value={values.phone}
                    onChange={handleChange}
                    name="phone"
                    id="phone"
                    inputComponent={TextMaskCustom}
                  />
                </FormControl>
                <TextField
                  id="address"
                  variant="outlined"
                  label="Address"
                  name="address"
                  fullWidth
                  onChange={handleChange}
                  className={classes.field}
                />

                {(values.name === "" ||
                  values.email === "" ||
                  values.phone === "" ||
                  values.address === "") && (
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
                    values.address === ""
                  }
                  className={classes.button}
                >
                  submit
                </Button>
              </form>
            )}
            {/* ---Calendly page--- */}
            {validation.success && (
              <>
                <Typography
                  variant="body1"
                  align="center"
                  className={classes.successMessage}
                >
                  {successMessage}
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  className={classes.subSuccessMessage}
                >
                  {subSuccessMessage}
                </Typography>
                <InlineWidget
                  pageSettings={{
                    hideEventTypeDetails: true,
                    hideLandingPageDetails: false,
                  }}
                  prefill={{
                    customAnswers: {
                      a1: values.phone,
                    },
                    email: values.email,
                    name: values.name,
                  }}
                  styles={{
                    height: "1000px",
                  }}
                  url="https://calendly.com/deepsun80"
                />
              </>
            )}
            {/* ---Error page--- */}
            {validation.error && (
              <>
                <Typography
                  variant="body1"
                  align="center"
                  className={classes.errorMessage}
                >
                  {errorMessage}
                </Typography>
                <AniLink
                  fade
                  to="/"
                  className={classes.link}
                  title={title}
                  alt={title}
                >
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
        </Paper>
      </Container>
    </section>
  )
}

FullPageSchedule.propTypes = {
  title: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
  subSuccessMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  validationMessage: PropTypes.string.isRequired,
  emailMessage: PropTypes.string.isRequired,
  localHostError: PropTypes.string.isRequired,
  liveError: PropTypes.string.isRequired,
}

export default FullPageSchedule
