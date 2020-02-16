import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Pagination from '@material-ui/lab/Pagination'
import Typography from '@material-ui/core/Typography'
import Fade from 'react-reveal/Fade'
import Testimonial from './Testimonial'
import { useStaticQuery, graphql } from 'gatsby'
import useStyles from './style'

const Testimonials = () => {
  const images = useStaticQuery(graphql`
    query {
      image1: file(relativePath: { eq: "testimonialsImg1.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      image2: file(relativePath: { eq: "testimonialsImg2.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const classes = useStyles()

  const [page, setPage] = useState(1)
  const handleChange = (event, value) => setPage(value)

  return (
    <section>
      <Fade duration={1500} ssrFadeout>
        <Container className={classes.container}>
          <Typography variant="h4" color="primary">
            our
          </Typography>
          <div className={classes.flex}>
            <Typography variant="h3" color="primary">
              client
            </Typography>
            <Typography
              variant="h3"
              color="secondary"
              className={classes.rightLetter}
            >
              reviews
            </Typography>
          </div>
          <div className={classes.innerContainer} />
          {page === 1 && (
            <Testimonial
              author="john doe"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam!"
              image={images.image1.childImageSharp.fluid}
            />
          )}
          {page === 2 && (
            <Testimonial
              author="jane doe"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam!"
              image={images.image2.childImageSharp.fluid}
            />
          )}
          <Pagination
            size="large"
            page={page}
            count={2}
            onChange={handleChange}
            className={classes.pagination}
          />
        </Container>
      </Fade>
    </section>
  )
}

export default Testimonials
