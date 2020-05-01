import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import useStyles from "./style"

const VerticalImgCard = ({ header, text, image, button, headerTag }) => {
  const classes = useStyles()

  return (
    <Card elevation={3} className={classes.root}>
      <CardActionArea>
        <Img fluid={image.fluid} alt="2 col image" title="2 col image" />
        <CardContent className={classes.cardContent}>
          <Typography
            variant="h3"
            component={headerTag}
            color="primary"
            className={classes.header}
          >
            {header}
          </Typography>
          <div className={classes.line} />
          <Typography variant="body2">{text}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="medium"
          color="secondary"
          fullWidth
          className={classes.button}
        >
          {button}
        </Button>
      </CardActions>
    </Card>
  )
}

VerticalImgCard.propTypes = {
  text: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  headerTag: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
}

export default VerticalImgCard
