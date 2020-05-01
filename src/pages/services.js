import React from "react"
import Layout from "../layouts"
import SEO from "../components/SEO"
import FullBgHeader from "../components/Sections/FullBgHeader"
import TwoColTxtImg from "../components/Sections/TwoColTxtImg"
import TwoColBgTxt from "../components/Sections/TwoColBgTxt"
import Contact from "../components/Contact"
import { graphql } from "gatsby"

const services = ({ data }) => {
  const {
    background,
    section1Image,
    section2Image,
    section3Image,
    contactBg,
  } = data

  const {
    title,
    description,
    titleSpan,
    subTitle,
    header,
    headerSpan,
    text,
    headerTwo,
    headerSpanTwo,
    textTwo,
    headerThree,
    headerSpanThree,
    textThree,
    contactHeader,
    contactSubHeader,
    contactSuccess,
    contactError,
    contactValidation,
    contactEmail,
    localHostError,
    liveError,
  } = data.markdownRemark.frontmatter

  return (
    <Layout>
      <SEO title={title} description={description} />
      <FullBgHeader
        header={title}
        headerSpan={titleSpan}
        subHeader={subTitle}
        image={background.childImageSharp}
      />
      <TwoColTxtImg
        header={header}
        headerTag="h2"
        headerSpan={headerSpan}
        text={text}
        image={section1Image.childImageSharp}
      />
      <div className="contact" />
      <Contact
        header={contactHeader}
        subHeader={contactSubHeader}
        successMessage={contactSuccess}
        errorMessage={contactError}
        validationMessage={contactValidation}
        emailMessage={contactEmail}
        localHostError={localHostError}
        liveError={liveError}
        image={contactBg.childImageSharp}
      />
      <TwoColBgTxt
        header={headerTwo}
        headerTag="h2"
        headerSpan={headerSpanTwo}
        text={textTwo}
        image={section2Image.childImageSharp}
      />
      <TwoColTxtImg
        header={headerThree}
        headerTag="h2"
        headerSpan={headerSpanThree}
        text={textThree}
        image={section3Image.childImageSharp}
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
    section1Image: file(relativePath: { eq: "gardenCare.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    section2Image: file(relativePath: { eq: "lawnCare.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    section3Image: file(relativePath: { eq: "landscaping.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    contactBg: file(relativePath: { eq: "overlayPattern.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    markdownRemark(frontmatter: { path: { eq: "/services" } }) {
      frontmatter {
        title
        description
        titleSpan
        subTitle
        header
        headerSpan
        text
        headerTwo
        headerSpanTwo
        textTwo
        headerThree
        headerSpanThree
        textThree
        contactHeader
        contactSubHeader
        contactSuccess
        contactError
        contactValidation
        contactEmail
        localHostError
        liveError
      }
    }
  }
`

export default services
