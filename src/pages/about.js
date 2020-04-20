import React from "react"
import Layout from "../layouts"
import FullBg from "../components/Sections/FullBg"
import { graphql } from "gatsby"

const about = ({ data }) => {
  return (
    <Layout>
      <FullBg
        header="about"
        headerSpan="us"
        subHeader="about our company"
        bannerImage={data.background.childImageSharp}
      />
    </Layout>
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
    image: file(relativePath: { eq: "section1img.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default about
