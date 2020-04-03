import React from "react"
import Layout from "../layouts"
import Banner2 from "../components/Banner/Banner2"
import Contact from "../components/Contact"
import { graphql } from "gatsby"

const contact = ({ data }) => {
  const {
    success,
    error,
    validation,
    email,
    localHostError,
    liveError,
  } = data.markdownRemark.frontmatter

  return (
    <Layout>
      <Banner2
        header="contact"
        headerSpan="us"
        subHeader="questions? send us a message"
        bannerImage={data.background.childImageSharp}
      />
      <Contact
        successMessage={success}
        errorMessage={error}
        validationMessage={validation}
        emailMessage={email}
        localHostError={localHostError}
        liveError={liveError}
      />
    </Layout>
  )
}

export const data = graphql`
  query {
    background: file(relativePath: { eq: "bannerBg.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    image: file(relativePath: { eq: "section1img.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    markdownRemark(frontmatter: { path: { eq: "/contact" } }) {
      frontmatter {
        success
        error
        validation
        email
        localHostError
        liveError
      }
    }
  }
`

export default contact
