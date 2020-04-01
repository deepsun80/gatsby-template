import React from "react"
import Layout from "../layouts"
import Banner2 from "../components/Banner/Banner2"
import Schedule from "../components/Schedule"
import SEO from "../components/SEO"
import { graphql } from "gatsby"

const schedule = ({ data }) => {
  const {
    title,
    success,
    subSuccess,
    error,
    validation,
    email,
  } = data.markdownRemark.frontmatter

  return (
    <Layout>
      <SEO title={title} />
      <Banner2
        header="schedule"
        headerSpan="appointment"
        subHeader="schedule your appointment online"
        bannerImage={data.background.childImageSharp}
      />
      <Schedule
        successMessage={success}
        subSuccessMessage={subSuccess}
        errorMessage={error}
        validationMessage={validation}
        emailMessage={email}
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
    markdownRemark(frontmatter: { path: { eq: "/schedule" } }) {
      frontmatter {
        title
        success
        subSuccess
        error
        validation
        email
      }
    }
  }
`

export default schedule
