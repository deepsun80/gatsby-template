import React from "react"
import Layout from "../layouts"
import Banner2 from "../components/Banner/Banner2"
import Schedule from "../components/Schedule"
import { graphql } from "gatsby"

const schedule = ({ data }) => {
  const { success, error } = data.markdownRemark.frontmatter

  return (
    <Layout>
      <Banner2
        header="schedule"
        headerSpan="appointment"
        subHeader="schedule your appointment online"
        bannerImage={data.background.childImageSharp}
      />
      <Schedule successMessage={success} errorMessage={error} />
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
        success
        error
      }
    }
  }
`

export default schedule
