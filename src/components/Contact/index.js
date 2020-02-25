import React from "react"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Fade from "react-reveal/Fade"
import useStyles from "./style"

const Contact = ({ children }) => {
  const classes = useStyles()

  return (
    <section>
      <Container className={classes.container}>
        <Paper elevation={1} className={classes.paper}>
          <Fade duration={1500} ssrFadeout>
            {children}
          </Fade>
        </Paper>
      </Container>
    </section>
  )
}

export default Contact
