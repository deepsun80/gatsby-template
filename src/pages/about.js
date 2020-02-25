import React from "react"
import Banner2 from "../components/Banner/Banner2"
// import Section2 from "../components/Section/Section3"
// import Section3 from "../components/Section/Section3"
import { graphql } from "gatsby"

const about = ({ data }) => {
  return (
    <>
      <Banner2
        header="about"
        headerSpan="us"
        subHeader="about our company"
        bannerImage={data.background.childImageSharp}
      />
      {/* <Section2
        section3Text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        section3Image={data.image.childImageSharp}
      /> */}
    </>
  )
}

export const data = graphql`
  {
    background: file(relativePath: { eq: "bannerBg.jpg" }) {
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
