import React from "react"
import PropTypes from "prop-types"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import BackgroundImage from "gatsby-background-image"
import { BsThreeDotsVertical } from "react-icons/bs"
import scrollTo from "gatsby-plugin-smoothscroll"
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
          height: "80vh",
          backgroundSize: "cover",
        }}
        fluid={image.fluid}
      >
        <div className={classes.overlay}>
          <Container maxWidth="xl" className={classes.container}>
            <Paper elevation={0} className={classes.paper}>
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
            </Paper>
            <div className={classes.verticalButton}>
              <BsThreeDotsVertical
                className={classes.icon}
                style={{ opacity: 0.3 }}
                onClick={() => scrollTo(".scroll-down")}
              />
              <BsThreeDotsVertical
                className={classes.icon}
                style={{ opacity: 0.5 }}
                onClick={() => scrollTo(".scroll-down")}
              />
              <BsThreeDotsVertical
                className={classes.icon}
                style={{ opacity: 0.75 }}
                onClick={() => scrollTo(".scroll-down")}
              />
              <BsThreeDotsVertical
                className={classes.icon}
                onClick={() => scrollTo(".scroll-down")}
              />
            </div>
          </Container>
        </div>
      </BackgroundImage>
      <div className="scroll-down" />
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
