import React from "react"
import PropTypes from "prop-types"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import BackgroundImage from "gatsby-background-image"
import useStyles from "./style"

// ------------ Full banner with text ------------

const FullBgHeader = ({ header, headerSpan, subHeader, image }) => {
  const classes = useStyles()

  return (
    <section>
      <BackgroundImage
        Tag="section"
        alt="hero image"
        title="hero image"
        style={{
          backgroundSize: "cover",
        }}
        fluid={image.fluid}
      >
        <Paper elevation={0} className={classes.paper}>
          <Container maxWidth="xl" className={classes.container}>
            <Typography variant="h1" className={classes.header}>
              {header} <span className={classes.headerSpan}>{headerSpan}</span>
            </Typography>
            <Typography
              variant="subtitle1"
              color="primary"
              className={classes.subtitle}
              component="p"
            >
              {subHeader}
            </Typography>
          </Container>
        </Paper>
      </BackgroundImage>
      <div className="scroll-down" />
    </section>
  )
}

FullBgHeader.propTypes = {
  header: PropTypes.string.isRequired,
  headerSpan: PropTypes.string.isRequired,
  subHeader: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
}

export default FullBgHeader
