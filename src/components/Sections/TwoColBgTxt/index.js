import React from "react"
import PropTypes from "prop-types"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import BackgroundImage from "gatsby-background-image"
import useStyles from "./style"

// ------------ 2 Columns, Left Text, Right Background Image ----------

const TwoColTxtBg = ({ header, headerSpan, subHeader, text, image }) => {
  const classes = useStyles()

  return (
    <section>
      <Grid container justify="center" className={classes.container}>
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
            <div className={classes.flex}>
              <Typography variant="h2" component="p" color="primary">
                {header}
                <span className={classes.rightLetter}> {headerSpan}</span>
              </Typography>
            </div>
            <Typography
              variant="h5"
              component="h2"
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
          </Container>
        </Grid>
      </Grid>
    </section>
  )
}

TwoColTxtBg.propTypes = {
  header: PropTypes.string.isRequired,
  headerSpan: PropTypes.string.isRequired,
  subHeader: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
}

export default TwoColTxtBg
