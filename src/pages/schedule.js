import React, { useState } from "react"
import Banner2 from "../components/Banner/Banner2"
import Contact from "../components/Contact"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { graphql } from "gatsby"

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const Schedule = ({ data }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [success, setSuccess] = useState(false)

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    try {
      // fetch("/", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
      //   body: encode({
      //     "form-name": form.getAttribute("name"),
      //     ...values,
      //   }),
      // })
      axios({
        url: "/",
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: encode({
          "form-name": form.getAttribute("name"),
          ...values,
        }),
      })
      setSuccess(true)
    } catch (error) {
      alert(error)
    }
  }

  const validateEmail = mail => {
    if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true
    }
    return false
  }

  return (
    <>
      <Banner2
        header="schedule"
        headerSpan="appointment"
        subHeader="please fill out the form below and select a date to schedule an appointment."
        bannerImage={data.background.childImageSharp}
      />
      <Contact>
        <form
          name="schedule"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={handleChange} />
            </label>
          </p>
          <TextField
            fullWidth
            margin="normal"
            color="primary"
            type="text"
            id="standard-basic"
            label="Your Name"
            name="name"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            color="primary"
            type="email"
            id="standard-basic"
            label="Your Email"
            name="email"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            color="primary"
            type="tel"
            id="standard-basic"
            label="Your Phone Number"
            name="phone"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            id="standard-multiline-static"
            label="Your Message"
            name="message"
            multiline
            rows="4"
            onChange={handleChange}
          />
          {(values.name === "" ||
            values.email === "" ||
            values.phone === "" ||
            values.message === "") && (
            <Typography variant="body2" color="error">
              All fields are required
            </Typography>
          )}
          {values.email !== "" && !validateEmail(values.email) && (
            <Typography variant="body2" color="error">
              Please enter a valid email
            </Typography>
          )}
          {success && (
            <Typography variant="body2" color="secondary">
              Thank you for scheduling you appointment. We will get in touch
              with you very soon.
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="secondary"
            disabled={
              values.name === "" ||
              values.email === "" ||
              values.phone === "" ||
              values.message === "" ||
              !validateEmail(values.email)
            }
            style={{ marginTop: 30 }}
          >
            Send
          </Button>
        </form>
      </Contact>
    </>
  )
}

export const data = graphql`
  {
    background: file(relativePath: { eq: "bannerBg.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default Schedule
