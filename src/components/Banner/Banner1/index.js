import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Hidden from "@material-ui/core/Hidden"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import BackgroundImage from "gatsby-background-image"
import { AiOutlineDown } from "react-icons/ai"
// import Fade from "react-reveal/Fade"
import scrollTo from "gatsby-plugin-smoothscroll"
import { configureAnchors, removeHash } from "react-scrollable-anchor"
import useStyles from "./style"

const Banner1 = ({ header, headerSpan, subHeader, bannerImage }) => {
  const classes = useStyles()

  // let windowScrollTop

  // if (typeof window !== "undefined") {
  //   windowScrollTop = window.pageYOffset / 3
  // } else {
  //   windowScrollTop = 0
  // }

  // const [transform, setTransform] = useState(
  //   `translate3d(0,${windowScrollTop}px,0)`
  // )

  // const resetTransform = () => {
  //   const windowScrollTop = window.pageYOffset / 3
  //   setTransform(`translate3d(0,${windowScrollTop}px,0)`)
  // }

  // useEffect(() => {
  //   configureAnchors({ offset: -90, scrollDuration: 200 })
  //   return () => {
  //     removeHash()
  //   }
  // }, [])

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.addEventListener("scroll", resetTransform)
  //   }
  //   return function cleanup() {
  //     if (typeof window !== "undefined") {
  //       window.removeEventListener("scroll", resetTransform)
  //     }
  //   }
  // })

  return (
    <section>
      <Grid container className={classes.grid}>
        <Hidden smDown>
          <Grid item md={3}></Grid>
        </Hidden>
        <Grid item md={9} xs={12}>
          <BackgroundImage
            Tag="section"
            style={{
              height: "100%",
              backgroundSize: "cover",
              // transform,
            }}
            fluid={bannerImage.fluid}
          />
        </Grid>
      </Grid>
      <Container maxWidth="md" className={classes.container}>
        <Paper elevation={1} className={classes.paper}>
          {/* <Fade left duration={1500} distance="80px" ssrFadeout> */}
          <Typography variant="h1" color="primary">
            {header}
          </Typography>
          <Typography variant="h1" color="secondary">
            {headerSpan}
          </Typography>
          <Typography
            variant="subtitle1"
            color="primary"
            className={classes.subtitle}
          >
            {subHeader}
          </Typography>
          {/* </Fade> */}
          <div className={classes.flex}>
            <AiOutlineDown
              className={classes.icon}
              onClick={() => scrollTo(".scroll-down")}
            />
          </div>
        </Paper>
      </Container>
      <div className="scroll-down" />
    </section>
  )
}

Banner1.propTypes = {
  header: PropTypes.string.isRequired,
  headerSpan: PropTypes.string.isRequired,
  subHeader: PropTypes.string.isRequired,
  bannerImage: PropTypes.object.isRequired,
}

export default Banner1
