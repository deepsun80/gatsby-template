import React from "react"
import Layout from "../layouts"
import FullBgHeader from "../components/Sections/FullBgHeader"
import Contact from "../components/Contact"
import SEO from "../components/SEO"
import { graphql } from "gatsby"

const contact = ({ data }) => {
  const {
    title,
    titleSpan,
    subTitle,
    header,
    subHeader,
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
      <FullBgHeader
        header={title}
        headerSpan={titleSpan}
        subHeader={subTitle}
        image={data.background.childImageSharp}
      />
      <Contact
        header={header}
        subHeader={subHeader}
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
    background: file(relativePath: { eq: "heroBg.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    markdownRemark(frontmatter: { path: { eq: "/contact" } }) {
      frontmatter {
        title
        titleSpan
        subTitle
        header
        subHeader
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
