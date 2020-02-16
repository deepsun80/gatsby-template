import React from 'react'
import Container from '@material-ui/core/Container'
import ImageSection from './ImageSection'
import { useStaticQuery, graphql } from 'gatsby'
import useStyles from './style'

const Section2 = () => {
  const images = useStaticQuery(graphql`
    query {
      image1: file(relativePath: { eq: "section2img1.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      image2: file(relativePath: { eq: "section2img2.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const classes = useStyles()

  return (
    <div className={classes.background}>
      <Container className={classes.container}>
        <ImageSection
          image={images.image2.childImageSharp.fluid}
          link={''}
          header={'our services'}
          text={'Learn more about our services'}
        />
        <ImageSection
          image={images.image1.childImageSharp.fluid}
          link={''}
          header={'resources'}
          text={'Browse our online resources'}
        />
      </Container>
    </div>
  )
}

export default Section2
