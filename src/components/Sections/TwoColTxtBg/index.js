import React from "react"
import PropTypes from "prop-types"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import BackgroundImage from "gatsby-background-image"
import useStyles from "./style"

// ------------ 2 Columns, Left Text, Right Background Image ----------

const TwoColTxtBg = ({ header, headerSpan, text, image }) => {
  const classes = useStyles()

  return (
    <section>
      <Grid container justify="center" className={classes.container}>
        <Grid item lg={6} xs={12} className={classes.grid}>
          <Container maxWidth="sm">
            <div className={classes.flex}>
              <Typography variant="h3" color="primary">
                {header}
              </Typography>
              <Typography
                variant="h3"
                color="secondary"
                className={classes.rightLetter}
              >
                {headerSpan}
              </Typography>
            </div>
            <Typography
              variant="body2"
              color="primary"
              className={classes.text}
            >
              {text}
            </Typography>
          </Container>
        </Grid>
        <Grid item lg={6} xs={12}>
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
      </Grid>
    </section>
  )
}

TwoColTxtBg.propTypes = {
  header: PropTypes.string.isRequired,
  headerSpan: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
}

export default TwoColTxtBg
