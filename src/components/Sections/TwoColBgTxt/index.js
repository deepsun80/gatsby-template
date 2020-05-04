import React from "react"
import PropTypes from "prop-types"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import BackgroundImage from "gatsby-background-image"
import Fade from "react-reveal/Fade"
import useStyles from "./style"

// ------------ 2 Columns, Left Text, Right Background Image ----------

const TwoColBgTxt = ({
  header,
  headerSpan,
  subHeader,
  text,
  image,
  headerTag,
}) => {
  const classes = useStyles()

  return (
    <section className={classes.section}>
      <Grid container className={classes.container}>
        <Grid item md={4} xs={12}>
          <BackgroundImage
            Tag="section"
            alt="2 col background"
            title="2 col background"
            style={{
              height: "100%",
              backgroundSize: "cover",
            }}
            fluid={image.fluid}
          />
        </Grid>
        <Grid item md={8} xs={12} className={classes.grid}>
          <Container maxWidth="sm">
            <Fade duration={1600} ssrFadeout style={{ width: "100vw" }}>
              <div className={classes.flex}>
                <Typography variant="h2" component={headerTag} color="primary">
                  {header}
                  <span className={classes.rightLetter}> {headerSpan}</span>
                </Typography>
              </div>
              <Typography
                variant="h5"
                component="p"
                color="secondary"
                className={classes.subHeader}
              >
                {subHeader}
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                className={classes.text}
              >
                {text}
              </Typography>
            </Fade>
          </Container>
        </Grid>
      </Grid>
    </section>
  )
}

TwoColBgTxt.defaultProps = {
  subHeader: "",
}

TwoColBgTxt.propTypes = {
  header: PropTypes.string.isRequired,
  headerTag: PropTypes.string.isRequired,
  headerSpan: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
}

export default TwoColBgTxt
