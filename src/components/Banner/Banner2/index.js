import React from "react"
import PropTypes from "prop-types"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import BackgroundImage from "gatsby-background-image"
import useStyles from "./style"

const Banner2 = ({ header, headerSpan, subHeader, bannerImage }) => {
  const classes = useStyles()

  return (
    <BackgroundImage
      Tag="section"
      fluid={bannerImage.fluid}
      style={{
        height: "300px",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          width: "100vw",
          height: "300px",
          background: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Container className={classes.container}>
          <Card elevation={1}>
            <CardContent className={classes.content}>
              <Grid container>
                <Grid item xs={2} className={classes.gridColor}></Grid>
                <Grid item xs={10} className={classes.grid}>
                  <div className={classes.flex}>
                    <Typography
                      variant="h1"
                      color="primary"
                      className={classes.header}
                    >
                      {header}
                    </Typography>
                    <Typography
                      variant="h1"
                      color="secondary"
                      className={classes.rightLetter}
                    >
                      {headerSpan}
                    </Typography>
                  </div>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    className={classes.subtitle}
                  >
                    {subHeader}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </div>
    </BackgroundImage>
  )
}

Banner2.propTypes = {
  header: PropTypes.string.isRequired,
  headerSpan: PropTypes.string.isRequired,
  subHeader: PropTypes.string.isRequired,
  bannerImage: PropTypes.object.isRequired,
}

export default Banner2
