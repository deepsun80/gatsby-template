import React from "react"
import Layout from "../layouts"
import SEO from "../components/SEO"
import FullBgHeader from "../components/Sections/FullBgHeader"
import TwoColTxtImg from "../components/Sections/TwoColTxtImg"
import Contact from "../components/Contact"
import OneColTxt from "../components/Sections/OneColTxt"
import { graphql } from "gatsby"

const about = ({ data }) => {
  const { background, image, contactBg, site } = data

  const {
    title,
    description,
    titleSpan,
    subTitle,
    header,
    headerSpan,
    subHeader,
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
        subHeader={subHeader}
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
        headerTag="p"
        headerSpan={headerSpanTwo}
        subHeader={subHeaderTwo}
        subHeaderSpan={site.siteMetadata.data.tel}
        text={textTwo}
        image={image.childImageSharp}
      />
    </Layout>
  )
}

export const data = graphql`
  {
    site {
      siteMetadata {
        data {
          tel
        }
      }
    }
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
        description
        titleSpan
        subTitle
        header
        headerSpan
        subHeader
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
