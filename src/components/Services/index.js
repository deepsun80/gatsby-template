import React from "react"
import PropTypes from "prop-types"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import VerticalImgCard from "../Sections/VerticalImgCard"
import Fade from "react-reveal/Fade"
import useStyles from "./style"

const Services = ({
  button,
  header1,
  text1,
  header2,
  text2,
  header3,
  text3,
  img1,
  img2,
  img3,
}) => {
  const classes = useStyles()

  return (
    <section>
      <Container className={classes.container}>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <Fade duration={1200} ssrFadeout>
              <VerticalImgCard
                image={img1}
                header={header1}
                headerTag="h3"
                text={text1}
                button={button}
              />
            </Fade>
          </Grid>
          <Grid item md={4} xs={12} className={classes.middleGrid}>
            <Fade duration={1600} ssrFadeout>
              <VerticalImgCard
                image={img2}
                header={header2}
                headerTag="h3"
                text={text2}
                button={button}
              />
            </Fade>
          </Grid>
          <Grid item md={4} xs={12}>
            <Fade duration={2000} ssrFadeout>
              <VerticalImgCard
                image={img3}
                header={header3}
                headerTag="h3"
                text={text3}
                button={button}
              />
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}

Services.propTypes = {
  button: PropTypes.string.isRequired,
  header1: PropTypes.string.isRequired,
  text1: PropTypes.string.isRequired,
  header2: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
  header3: PropTypes.string.isRequired,
  text3: PropTypes.string.isRequired,
  img1: PropTypes.object.isRequired,
  img2: PropTypes.object.isRequired,
  img3: PropTypes.object.isRequired,
}

export default Services
