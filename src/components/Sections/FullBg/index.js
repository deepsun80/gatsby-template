import React from "react"
import PropTypes from "prop-types"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import BackgroundImage from "gatsby-background-image"
import { BsThreeDotsVertical } from "react-icons/bs"
import scrollTo from "gatsby-plugin-smoothscroll"
import Fade from "react-reveal/Fade"
import useStyles from "./style"

// ------------ Full banner with text ------------

const FullBg = ({ header, headerSpan, subHeader, image }) => {
  const classes = useStyles()

  return (
    <section>
      <BackgroundImage
        Tag="section"
        alt="hero image"
        title="hero image"
        style={{
          height: "90vh",
          backgroundSize: "cover",
          backgroundAttachment: "fixed"
        }}
        fluid={image.fluid}
      >
        <div className={classes.overlay}>
          <Container maxWidth="xl" className={classes.container}>
            <div className={classes.verticalButton}>
              <BsThreeDotsVertical
                className={classes.icon}
                style={{ opacity: 0.3 }}
                onClick={() => scrollTo(".scroll-down")}
              />
              <BsThreeDotsVertical
                className={classes.icon}
                style={{ opacity: 0.5 }}
                onClick={() => scrollTo("#scroll-down")}
              />
              <BsThreeDotsVertical
                className={classes.icon}
                style={{ opacity: 0.75 }}
                onClick={() => scrollTo("#scroll-down")}
              />
              <BsThreeDotsVertical
                className={classes.icon}
                onClick={() => scrollTo("#scroll-down")}
              />
            </div>
            <Paper elevation={0} className={classes.paper}>
              <Fade duration={1600} ssrFadeout>
                <Typography variant="h1" className={classes.header}>
                  {header} <br />
                  <span className={classes.headerSpan}>{headerSpan}</span>
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  className={classes.subtitle}
                  component="p"
                >
                  {subHeader}
                </Typography>
                <AniLink fade to={"/schedule"}>
                  <Button
                    variant="contained"
                    size="medium"
                    color="secondary"
                    className={classes.button}
                  >
                    book appointment now
                  </Button>
                </AniLink>
              </Fade>
            </Paper>
          </Container>
        </div>
      </BackgroundImage>
      <div id="scroll-down" />
    </section>
  )
}

FullBg.propTypes = {
  header: PropTypes.string.isRequired,
  headerSpan: PropTypes.string.isRequired,
  subHeader: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
}

export default FullBg
