import React from "react"
import Layout from "../layouts"
import FullBgHeader from "../components/Sections/FullBgHeader"
import Schedule from "../components/Schedule"
import SEO from "../components/SEO"
import { graphql } from "gatsby"

const schedule = ({ data }) => {
  const { background } = data

  const {
    title,
    titleSpan,
    subTitle,
    success,
    subSuccess,
    error,
    validation,
    email,
    localHostError,
    liveError,
  } = data.markdownRemark.frontmatter

  return (
    <Layout>
      <SEO title={title} />
      <FullBgHeader
        largeFont
        header={title}
        headerSpan={titleSpan}
        subHeader={subTitle}
        image={background.childImageSharp}
      />
      <div className="contact" />
      <Schedule
        successMessage={success}
        subSuccessMessage={subSuccess}
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
    background: file(relativePath: { eq: "heroBg.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    markdownRemark(frontmatter: { path: { eq: "/schedule" } }) {
      frontmatter {
        title
        titleSpan
        subTitle
        success
        subSuccess
        error
        validation
        email
        localHostError
        liveError
      }
    }
  }
`

export default schedule
