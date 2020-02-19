import React from "react"
import Banner2 from "../components/Banner/Banner2"
import Section3 from "../components/Section/Section3"
import { graphql } from "gatsby"
import Section2 from "../components/Section/Section3"

const about = ({ data }) => {
  console.log(data)
  return (
    <>
      <Banner2
        header="about"
        headerSpan="us"
        subHeader="about our company"
        bannerImage={data.background.childImageSharp}
      />
      <Section2
        section3Text="dkjkjdhkd.dkhkdjhkd."
        section3Image={data.image.childImageSharp}
      />
    </>
  )
}

export const data = graphql`
  {
    background: file(relativePath: { eq: "banner1bg.jpg" }) {
      childImageSharp {
        fluid {
          src
        }
      }
    }
    image: file(relativePath: { eq: "section1img.jpg" }) {
      childImageSharp {
        fluid {
          src
        }
      }
    }
  }
`

export default about
