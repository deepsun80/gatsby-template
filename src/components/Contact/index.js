import React from "react"
import PropTypes from "prop-types"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import useStyles from "./style"

const Contact = ({ children, text }) => {
  const classes = useStyles()

  return (
    <section>
      <Container className={classes.container}>
        <Paper elevation={1} className={classes.paper}>
          {children}
        </Paper>
      </Container>
    </section>
  )
}

Contact.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string.isRequired,
  headerSpan: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Contact
