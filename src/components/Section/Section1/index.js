import React from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Img from "gatsby-image"
// import Fade from "react-reveal/Fade"
import useStyles from "./style"

const Section1 = ({
  section1Header,
  section1HeaderSpan,
  section1Button,
  section1Text,
  section1Image,
}) => {
  const classes = useStyles()

  return (
    <section>
      <Paper elevation={0} className={classes.paper}>
        <Container maxWidth="xl" className={classes.container}>
          {/* <Fade duration={1500} ssrFadeout> */}
          <Grid container justify="center" spacing={2}>
            <Grid item lg={6} xs={12}>
              <div className={classes.flex}>
                <Typography variant="h3" color="primary">
                  {section1Header}
                </Typography>
                <Typography
                  variant="h3"
                  color="secondary"
                  className={classes.rightLetter}
                >
                  {section1HeaderSpan}
                </Typography>
              </div>
              <Typography
                variant="body2"
                color="primary"
                className={classes.text}
              >
                {section1Text}
              </Typography>
              <AniLink fade to={"/"}>
                <Button
                  variant="outlined"
                  size="large"
                  color="secondary"
                  className={classes.button}
                >
                  {section1Button}
                </Button>
              </AniLink>
            </Grid>
            <div className={classes.grow} />
            <Grid item lg={6} xs={12}>
              <Img fluid={section1Image.fluid} className={classes.image} />
            </Grid>
          </Grid>
          {/* </Fade> */}
        </Container>
      </Paper>
    </section>
  )
}

Section1.propTypes = {
  section1Header: PropTypes.string.isRequired,
  section1HeaderSpan: PropTypes.string.isRequired,
  section1Button: PropTypes.string.isRequired,
  section1Text: PropTypes.string.isRequired,
  section1Image: PropTypes.object.isRequired,
}

export default Section1
