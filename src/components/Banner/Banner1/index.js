import React from "react"
import PropTypes from "prop-types"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Hidden from "@material-ui/core/Hidden"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import BackgroundImage from "gatsby-background-image"
import { AiOutlineDown } from "react-icons/ai"
import scrollTo from "gatsby-plugin-smoothscroll"
import useStyles from "./style"

const Banner1 = ({ header, headerSpan, subHeader, bannerImage }) => {
  const classes = useStyles()

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
            }}
            fluid={bannerImage.fluid}
          />
        </Grid>
      </Grid>
      <Container maxWidth="md" className={classes.container}>
        <Paper elevation={1} className={classes.paper}>
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
