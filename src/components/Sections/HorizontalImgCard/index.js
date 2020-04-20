import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import useStyles from "./style"

const HorizontalImgCard = ({ text, subText, image }) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <div className={classes.content}>
        <Img
          fluid={image}
          className={classes.image}
          alt="horizontal card image"
          title="horizontal card image"
        />
        <CardContent>
          <Typography variant="body2" color="primary">
            {text}
          </Typography>
          <Typography
            variant="body1"
            color="primary"
            className={classes.subText}
          >
            {subText}
          </Typography>
        </CardContent>
      </div>
    </Card>
  )
}

HorizontalImgCard.propTypes = {
  text: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
}

export default HorizontalImgCard
