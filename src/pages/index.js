import React from "react"
import Banner1 from "../components/Banner/Banner1"
import Section1 from "../components/Section/Section1"
import Section2 from "../components/Section/Section2"
import Testimonials from "../components/Testimonials"
import SEO from "../components/SEO"
import { graphql } from "gatsby"

const index = ({ data }) => {
  const {
    title,
    header,
    headerSpan,
    subHeader,
    bannerImage,
    section1Header,
    section1HeaderSpan,
    section1Button,
    section1Text,
    section1Image,
    section2Header1,
    section2Text1,
    section2Image1,
    section2Header2,
    section2Text2,
    section2Image2,
    section3SmallHeader,
    section3Header,
    section3HeaderSpan,
    testimonial1Author,
    testimonial1Text,
    testimonial1Image,
    testimonial2Author,
    testimonial2Image,
    testimonial2Text,
  } = data.home

  return (
    <>
      <SEO title={title} />
      <Banner1
        header={header}
        headerSpan={headerSpan}
        subHeader={subHeader}
        bannerImage={bannerImage}
      />
      <Section1
        section1Header={section1Header}
        section1HeaderSpan={section1HeaderSpan}
        section1Button={section1Button}
        section1Text={section1Text}
        section1Image={section1Image}
      />
      <Section2
        section2Header1={section2Header1}
        section2Text1={section2Text1}
        section2Image1={section2Image1}
        section2Header2={section2Header2}
        section2Text2={section2Text2}
        section2Image2={section2Image2}
      />
      <Testimonials
        section3SmallHeader={section3SmallHeader}
        section3Header={section3Header}
        section3HeaderSpan={section3HeaderSpan}
        testimonial1Author={testimonial1Author}
        testimonial1Text={testimonial1Text}
        testimonial1Image={testimonial1Image}
        testimonial2Author={testimonial2Author}
        testimonial2Image={testimonial2Image}
        testimonial2Text={testimonial2Text}
      />
    </>
  )
}

export const data = graphql`
  query {
    home: contentfulHomePage {
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
      bannerImage {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      section1Image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      section2Image1 {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      section2Image2 {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      testimonial1Image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      testimonial2Image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      section1Text {
        section1Text
      }
      testimonial1Text {
        testimonial1Text
      }
      testimonial2Text {
        testimonial2Text
      }
    }
  }
`

export default index
