import React from "react"
import Layout from "../layouts"
import SEO from "../components/SEO"
import FullBgHeader from "../components/Sections/FullBgHeader"
import TwoColTxtImg from "../components/Sections/TwoColTxtImg"
import Contact from "../components/Contact"
import OneColTxt from "../components/Sections/OneColTxt"
import { graphql } from "gatsby"

const about = ({ data }) => {
  const { background, image, contactBg } = data

  const {
    title,
    titleSpan,
    subTitle,
    header,
    headerSpan,
    text,
    headerTwo,
    headerSpanTwo,
    subHeaderTwo,
    textTwo,
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
      <SEO title={title} />
      <FullBgHeader
        header={title}
        headerSpan={titleSpan}
        subHeader={subTitle}
        image={background.childImageSharp}
      />
      <TwoColTxtImg
        header={header}
        headerSpan={headerSpan}
        text={text}
        image={image.childImageSharp}
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
      <OneColTxt
        header={headerTwo}
        headerSpan={headerSpanTwo}
        subHeader={subHeaderTwo}
        text={textTwo}
        image={image.childImageSharp}
      />
    </Layout>
  )
}

export const data = graphql`
  {
    background: file(relativePath: { eq: "heroBg.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    image: file(relativePath: { eq: "aboutImg.jpg" }) {
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
    markdownRemark(frontmatter: { path: { eq: "/about" } }) {
      frontmatter {
        title
        titleSpan
        subTitle
        header
        headerSpan
        text
        headerTwo
        headerSpanTwo
        subHeaderTwo
        textTwo
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

export default about
