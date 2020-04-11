import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { AiOutlineRight } from "react-icons/ai"
import useStyles from "./style"

const ImageSection = ({ image, header, text, link }) => {
  const classes = useStyles()

  return (
    <div className={classes.imageSection}>
      <Img fluid={image} />
      <Paper elevation={1} className={classes.paper}>
        <div>
          <Typography variant="h3" color="primary" className={classes.header}>
            {header}
          </Typography>
          <Typography variant="subtitle2" color="primary">
            {text}
          </Typography>
        </div>
        <AiOutlineRight className={classes.icon} />
      </Paper>
    </div>
  )
}

ImageSection.propTypes = {
  header: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired,
}

export default ImageSection
