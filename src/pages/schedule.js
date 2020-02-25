import React, { useState } from "react"
// import { navigateTo } from "gatsby-link"
import Banner2 from "../components/Banner/Banner2"
import Contact from "../components/Contact"
import TextField from '@material-ui/core/TextField';
import { graphql } from "gatsby"

// const encode = data => {
//   return Object.keys(data)
//     .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
//     .join("&")
// }

const Schedule = ({ data }) => {
  const [values, setValues] = useState({})

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(values)
    // const form = e.target
    // try {
    //   fetch("/", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //     body: encode({
    //       "form-name": form.getAttribute("name"),
    //       ...values,
    //     }),
    //   })
    //   navigateTo(form.getAttribute("action"))
    // } catch (error) {
    //   alert(error)
    // }
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
                action="/thanks/"
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
                <TextField fullWidth margin="normal" color="primary" type="text" id="standard-basic" label="Your Name"  name="name" onChange={handleChange} />
                <TextField fullWidth margin="normal" color="primary" type="email" id="standard-basic" label="Your Email"  name="email" onChange={handleChange} />
                <TextField fullWidth margin="normal" color="primary" type="tel" id="standard-basic" label="Your Phone Number"  name="phone" onChange={handleChange} />
                <TextField
          id="standard-multiline-static"
          label="Multiline"
          multiline
          rows="4"
          defaultValue="Default Value"
        />
                <p>
                <button type="submit">Send</button>
                </p>
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
          src
        }
      }
    }
  }
`

export default Schedule
