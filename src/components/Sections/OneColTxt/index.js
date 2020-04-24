import React from "react"
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import useStyles from "./style"

// ------------ 1 Column Text with Button ----------

const OneColTxt = ({ header, headerSpan, subHeader, text }) => {
  const classes = useStyles()

  return (
    <section>
      <Paper elevation={0} className={classes.paper}>
        <Container className={classes.container}>
          <div className={classes.flex}>
            <div className={classes.line} />
            <Typography variant="h3" component="h2" color="primary">
              {header}
              <span className={classes.rightLetter}> {headerSpan}</span>
            </Typography>
          </div>
          <Typography
            variant="h3"
            component="h4"
            color="primary"
            className={classes.text}
          >
            {subHeader}
          </Typography>
          <Typography variant="body2" color="primary" className={classes.text}>
            {text}
          </Typography>
        </Container>
      </Paper>
    </section>
  )
}

OneColTxt.defaultProps = {
  subHeader: "",
}

OneColTxt.propTypes = {
  header: PropTypes.string.isRequired,
  headerSpan: PropTypes.string.isRequired,
  subHeader: PropTypes.string,
  text: PropTypes.string.isRequired,
}

export default OneColTxt
