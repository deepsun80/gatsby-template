import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
// import Fade from "react-reveal/Fade"
import useStyles from "./style"

const Testimonial = ({ text, author, image }) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      {/* <Fade duration={1500} ssrFadeout> */}
      <div className={classes.content}>
        <Img fluid={image} className={classes.image} />
        <CardContent>
          <Typography variant="body2" color="primary">
            {text}
          </Typography>
          <Typography
            variant="body1"
            color="primary"
            className={classes.author}
          >
            {author}
          </Typography>
        </CardContent>
      </div>
      {/* </Fade> */}
    </Card>
  )
}

Testimonial.propTypes = {
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
}

export default Testimonial
