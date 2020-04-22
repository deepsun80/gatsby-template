import React from "react"
import Layout from "../layouts"
import SEO from "../components/SEO"
import FullBgHeader from "../components/Sections/FullBgHeader"
import TwoColTxtImg from "../components/Sections/TwoColTxtImg"
import { graphql } from "gatsby"

const about = ({ data }) => {
  const { background, image } = data

  const {
    title,
    titleSpan,
    subTitle,
    header,
    headerSpan,
    text,
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
    markdownRemark(frontmatter: { path: { eq: "/about" } }) {
      frontmatter {
        title
        titleSpan
        subTitle
        header
        headerSpan
        text
      }
    }
  }
`

export default about
