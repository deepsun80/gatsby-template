import React from "react"
import Layout from "../layouts"
import Banner1 from "../components/Banner/Banner1"
import Section1 from "../components/Section/Section1"
import Section2 from "../components/Section/Section2"
import Testimonials from "../components/Testimonials"
// import SEO from "../components/SEO"
import { graphql } from "gatsby"

const index = ({ data }) => {
  const {
    bannerImage,
    section1Image,
    section2Image1,
    section2Image2,
    testimonial1Image,
    testimonial2Image,
  } = data

  const {
    title,
    header,
    headerSpan,
    subHeader,
    section1Header,
    section1HeaderSpan,
    section1Button,
    section1Text,
    section2Header1,
    section2Text1,
    section2Header2,
    section2Text2,
    section3SmallHeader,
    section3Header,
    section3HeaderSpan,
    testimonial1Author,
    testimonial1Text,
    testimonial2Author,
    testimonial2Text,
  } = data.markdownRemark.frontmatter

  return (
    <Layout>
      {/* <SEO title={title} /> */}
      <Banner1
        header={header}
        headerSpan={headerSpan}
        subHeader={subHeader}
        bannerImage={bannerImage.childImageSharp}
      />
      <Section1
        section1Header={section1Header}
        section1HeaderSpan={section1HeaderSpan}
        section1Button={section1Button}
        section1Text={section1Text}
        section1Image={section1Image.childImageSharp}
      />
      <Section2
        section2Header1={section2Header1}
        section2Text1={section2Text1}
        section2Image1={section2Image1.childImageSharp}
        section2Header2={section2Header2}
        section2Text2={section2Text2}
        section2Image2={section2Image2.childImageSharp}
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
    bannerImage: file(relativePath: { eq: "bannerBg.jpg" }) {
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
        section1Button
        section2Header1
        section2Text1
        section2Header2
        section2Text2
        section3SmallHeader
        section3Header
        section3HeaderSpan
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
