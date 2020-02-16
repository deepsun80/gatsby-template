import React from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Img from 'gatsby-image'
import Fade from 'react-reveal/Fade'
import useStyles from './style'
import { useStaticQuery, graphql } from 'gatsby'

const Section1 = () => {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "section1img.jpg" }) {
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
    <section>
      <Paper elevation={0} className={classes.paper}>
        <Container maxWidth="xl" className={classes.container}>
          <Fade duration={1500} ssrFadeout>
            <Grid container justify="center" spacing={2}>
              <Grid item lg={6} xs={12}>
                <div className={classes.flex}>
                  <Typography variant="h3" color="primary">
                    about
                  </Typography>
                  <Typography
                    variant="h3"
                    color="secondary"
                    className={classes.rightLetter}
                  >
                    us
                  </Typography>
                </div>
                <Typography
                  variant="body2"
                  color="primary"
                  className={classes.text}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
                <Button
                  variant="outlined"
                  size="large"
                  color="secondary"
                  className={classes.button}
                >
                  more about us
                </Button>
              </Grid>
              <div className={classes.grow} />
              <Grid item lg={6} xs={12}>
                <Img
                  fluid={image.childImageSharp.fluid}
                  className={classes.image}
                />
              </Grid>
            </Grid>
          </Fade>
        </Container>
      </Paper>
    </section>
  )
}

export default Section1
