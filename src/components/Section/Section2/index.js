import React from "react"
import PropTypes from "prop-types"
import Container from "@material-ui/core/Container"
import ImageSection from "./ImageSection"
import useStyles from "./style"

const Section2 = ({
  section2Header1,
  section2Text1,
  section2Image1,
  section2Header2,
  section2Text2,
  section2Image2,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.background}>
      <Container className={classes.container}>
        <ImageSection
          image={section2Image2.fluid}
          link={""}
          header={section2Header1}
          text={section2Text1}
        />
        <ImageSection
          image={section2Image1.fluid}
          link={""}
          header={section2Header2}
          text={section2Text2}
        />
      </Container>
    </div>
  )
}

Section2.propTypes = {
  section2Header1: PropTypes.string.isRequired,
  section2Text1: PropTypes.string.isRequired,
  section2Image1: PropTypes.object.isRequired,
  section2Header2: PropTypes.string.isRequired,
  section2Text2: PropTypes.string.isRequired,
  section2Image2: PropTypes.object.isRequired,
}

export default Section2
