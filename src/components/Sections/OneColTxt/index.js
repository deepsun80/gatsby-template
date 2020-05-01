import React from "react"
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Fade from "react-reveal/Fade"
import useStyles from "./style"

// ------------ 1 Column Text with Button ----------

const OneColTxt = ({
  header,
  headerSpan,
  subHeaderSpan,
  subHeader,
  text,
  headerTag,
}) => {
  const classes = useStyles()

  return (
    <section>
      <Fade duration={1600} ssrFadeout>
        <Paper elevation={0} className={classes.paper}>
          <Container className={classes.container}>
            <div className={classes.flex}>
              <div className={classes.line} />
              <Typography variant="h3" component={headerTag} color="primary">
                {header}
                <span className={classes.rightLetter}> {headerSpan}</span>
              </Typography>
            </div>
            <Typography
              variant="h4"
              component="p"
              color="primary"
              className={classes.text}
            >
              <i>{subHeader}</i>
              <a href={`tel:${subHeaderSpan}`}>
                <span className={classes.rightLetter}> {subHeaderSpan}</span>
              </a>
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              className={classes.text}
            >
              {text}
            </Typography>
          </Container>
        </Paper>
      </Fade>
    </section>
  )
}

OneColTxt.defaultProps = {
  subHeader: "",
  subHeaderSpan: "",
}

OneColTxt.propTypes = {
  header: PropTypes.string.isRequired,
  headerTag: PropTypes.string.isRequired,
  headerSpan: PropTypes.string.isRequired,
  subHeader: PropTypes.string,
  subHeaderSpan: PropTypes.string,
  text: PropTypes.string.isRequired,
}

export default OneColTxt
