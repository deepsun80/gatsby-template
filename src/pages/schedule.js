import React from "react"
import Layout from "../layouts"
import Banner2 from "../components/Banner/Banner2"
import Schedule from "../components/Schedule"
import { graphql } from "gatsby"

const schedule = ({ data }) => {
  return (
    <Layout>
      <Banner2
        header="schedule"
        headerSpan="appointment"
        subHeader="schedule your appointment online"
        bannerImage={data.background.childImageSharp}
      />
      <Schedule />
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

export default schedule
