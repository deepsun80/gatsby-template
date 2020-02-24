import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import FacebookIcon from "@material-ui/icons/Facebook"
import InstagramIcon from "@material-ui/icons/Instagram"
import LinkedInIcon from "@material-ui/icons/LinkedIn"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import useStyles from "./style"

const Footer1 = ({ logo, siteTitle, text, tel }) => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Container>
        <Paper elevation={1} className={classes.paper}>
          <Grid container className={classes.grid}>
            <Grid item lg={4} xs={12}>
              <Typography variant="body1" color="secondary">
                {tel}
              </Typography>
              <AniLink to={"#"}>
                <Typography
                  variant="body1"
                  color="primary"
                  className={classes.link}
                >
                  {text}
                </Typography>
              </AniLink>
            </Grid>
            <Grid
              item
              lg={4}
              xs={12}
              className={classNames(classes.logoContainer, classes.grid)}
            >
              <img
                alt={`${siteTitle} Logo`}
                title={`${siteTitle} Logo`}
                src={logo}
                className={classes.logo}
              />
            </Grid>
            <Grid
              item
              lg={4}
              xs={12}
              className={classNames(classes.socialMedia, classes.grid)}
            >
              <FacebookIcon color="primary" className={classes.icon} />
              <InstagramIcon color="primary" className={classes.icon} />
              <LinkedInIcon color="primary" className={classes.icon} />
            </Grid>
          </Grid>
          <Divider variant="middle" className={classes.divider} />
          <Grid container>
            <Grid item lg={6} xs={12} className={classes.copyrightContainer}>
              <Typography
                variant="caption"
                color="primary"
                className={classes.copyright}
              >
                © {new Date().getFullYear()} company name
              </Typography>
            </Grid>
            <Grid
              item
              lg={6}
              xs={12}
              className={classes.copyrightContainer}
              style={{ textAlign: "right" }}
            >
              <Typography
                variant="caption"
                color="primary"
                className={classes.copyright}
              >
                website by sandeep chandran
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </footer>
  )
}

Footer1.propTypes = {
  logo: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  tel: PropTypes.string.isRequired,
}

export default Footer1
