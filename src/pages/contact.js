import React from "react"
import Layout from "../layouts"
import FullBg from "../components/Sections/FullBg"
import Contact from "../components/Contact"
import SEO from "../components/SEO"
import { graphql } from "gatsby"

const contact = ({ data }) => {
  const {
    title,
    success,
    error,
    validation,
    email,
    localHostError,
    liveError,
  } = data.markdownRemark.frontmatter

  return (
    <Layout>
      <SEO title={title} />
      <FullBg
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
        title
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
