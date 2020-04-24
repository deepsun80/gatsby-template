import React from "react"
import Layout from "../layouts"
import FullBg from "../components/Sections/FullBg"
import OneColTxt from "../components/Sections/OneColTxt"
import Services from "../components/Services"
import Testimonials from "../components/Testimonials"
import Contact from "../components/Contact"
import SEO from "../components/SEO"
import { graphql } from "gatsby"

const index = ({ data }) => {
  const {
    heroBg,
    section1Image,
    section2Image1,
    section2Image2,
    section2Image3,
    testimonial1Image,
    testimonial2Image,
    contactBg,
  } = data

  const {
    title,
    header,
    headerSpan,
    subHeader,
    section1Header,
    section1HeaderSpan,
    section1Text,
    section2Button,
    section2Header1,
    section2Text1,
    section2Header2,
    section2Text2,
    section2Header3,
    section2Text3,
    section3SmallHeader,
    section3Header,
    section3HeaderSpan,
    contactHeader,
    contactSubHeader,
    contactSuccess,
    contactError,
    contactValidation,
    contactEmail,
    localHostError,
    liveError,
    testimonial1Author,
    testimonial1Text,
    testimonial2Author,
    testimonial2Text,
  } = data.markdownRemark.frontmatter

  return (
    <Layout>
      <SEO title={title} />
      <FullBg
        header={header}
        headerSpan={headerSpan}
        subHeader={subHeader}
        image={heroBg.childImageSharp}
      />
      <OneColTxt
        header={section1Header}
        headerSpan={section1HeaderSpan}
        text={section1Text}
        image={section1Image.childImageSharp}
      />
      <Services
        button={section2Button}
        header1={section2Header1}
        text1={section2Text1}
        header2={section2Header2}
        text2={section2Text2}
        header3={section2Header3}
        text3={section2Text3}
        img1={section2Image1.childImageSharp}
        img2={section2Image2.childImageSharp}
        img3={section2Image3.childImageSharp}
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
      <Testimonials
        section3SmallHeader={section3SmallHeader}
        section3Header={section3Header}
        section3HeaderSpan={section3HeaderSpan}
        testimonial1Author={testimonial1Author}
        testimonial1Text={testimonial1Text}
        testimonial1Image={testimonial1Image.childImageSharp}
        testimonial2Author={testimonial2Author}
        testimonial2Image={testimonial2Image.childImageSharp}
        testimonial2Text={testimonial2Text}
      />
    </Layout>
  )
}

export const data = graphql`
  query {
    heroBg: file(relativePath: { eq: "heroBg.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    section1Image: file(relativePath: { eq: "section1img.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    section2Image1: file(relativePath: { eq: "section2img1.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    section2Image2: file(relativePath: { eq: "section2img2.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    section2Image3: file(relativePath: { eq: "section2img3.jpg" }) {
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
    testimonial1Image: file(relativePath: { eq: "testimonialsImg1.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    testimonial2Image: file(relativePath: { eq: "testimonialsImg2.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    markdownRemark(frontmatter: { path: { eq: "/" } }) {
      frontmatter {
        title
        header
        headerSpan
        subHeader
        section1Header
        section1HeaderSpan
        section2Button
        section2Header1
        section2Text1
        section2Header2
        section2Text2
        section2Header3
        section2Text3
        section3SmallHeader
        section3Header
        section3HeaderSpan
        contactHeader
        contactSubHeader
        contactSuccess
        contactError
        contactValidation
        contactEmail
        localHostError
        liveError
        testimonial1Author
        testimonial2Author
        section1Text
        testimonial1Text
        testimonial2Text
      }
    }
  }
`

export default index
