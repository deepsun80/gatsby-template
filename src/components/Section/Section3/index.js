import React from "react"
import PropTypes from "prop-types"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Img from "gatsby-image"
import useStyles from "./style"

const Section2 = ({ section3Text, section3Image }) => {
  const classes = useStyles()

  return (
    <section className={classes.background}>
      <Container className={classes.container}>
        <Grid container>
          <Grid item md={6} xs={12}>
            {section3Text}
          </Grid>
          <Grid item md={6} xs={12}>
            <Img fluid={section3Image.fluid} className={classes.image} />
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}

Section2.propTypes = {
  section3Text: PropTypes.string.isRequired,
  section3Image: PropTypes.object.isRequired,
}

export default Section2
