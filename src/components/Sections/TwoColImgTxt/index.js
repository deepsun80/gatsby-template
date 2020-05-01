import React from "react"
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Img from "gatsby-image"
import Fade from "react-reveal/Fade"
import useStyles from "./style"

// ------------ 2 Columns, Left Text, Right Image ----------

const TwoColTxtImg = ({
  header,
  headerSpan,
  subHeader,
  text,
  image,
  headerTag,
}) => {
  const classes = useStyles()

  return (
    <section>
      <Paper elevation={0} className={classes.paper}>
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={2}>
            <Grid item lg={6} xs={12}>
              <Img fluid={image.fluid} alt="2 col image" title="2 col image" />
            </Grid>
            <div className={classes.grow} />
            <Grid item lg={6} xs={12} className={classes.gridFlex}>
              <Fade duration={1600} ssrFadeout>
                <>
                  <div className={classes.flex}>
                    <div className={classes.line} />
                    <Typography
                      variant="h2"
                      component={headerTag}
                      color="primary"
                    >
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
                  {/* <AniLink fade to={"/"}>
                  <Button
                    variant="outlined"
                    size="large"
                    color="secondary"
                    className={classes.button}
                  >
                    {button}
                  </Button>
                </AniLink> */}
                </>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </section>
  )
}

TwoColTxtImg.defaultProps = {
  subHeader: "",
}

TwoColTxtImg.propTypes = {
  header: PropTypes.string.isRequired,
  headerTag: PropTypes.string.isRequired,
  headerSpan: PropTypes.string.isRequired,
  subHeader: PropTypes.string,
  text: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
}

export default TwoColTxtImg
