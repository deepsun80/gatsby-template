import React from "react"
import Layout from "../layouts"
import FullBgHeader from "../components/Sections/FullBgHeader"
import Schedule from "../components/Schedule"
import SEO from "../components/SEO"
import { graphql } from "gatsby"

const schedule = ({ data }) => {
  const { site, background } = data

  const {
    title,
    description,
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
      <SEO title={title} description={description} />
      <FullBgHeader
        largeFont
        header={title}
        headerSpan={titleSpan}
        subHeader={subTitle}
        image={background.childImageSharp}
      />
      <div className="contact" />
      <Schedule
        title={site.siteMetadata.title}
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
    site {
      siteMetadata {
        title
      }
    }
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
        description
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
