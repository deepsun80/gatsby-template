import React, { useState } from "react"
import PropTypes from "prop-types"
import Container from "@material-ui/core/Container"
import Pagination from "@material-ui/lab/Pagination"
import Typography from "@material-ui/core/Typography"
import Fade from "react-reveal/Fade"
import Testimonial from "./Testimonial"
import useStyles from "./style"

const Testimonials = ({
  section3SmallHeader,
  section3Header,
  section3HeaderSpan,
  testimonial1Author,
  testimonial1Text,
  testimonial1Image,
  testimonial2Author,
  testimonial2Text,
  testimonial2Image,
}) => {
  const classes = useStyles()

  const [page, setPage] = useState(1)
  const handleChange = (event, value) => setPage(value)

  return (
    <section>
      <Fade duration={1500} ssrFadeout>
        <Container className={classes.container}>
          <Typography variant="h4" color="primary">
            <i>{section3SmallHeader}</i>
          </Typography>
          <div className={classes.flex}>
            <Typography variant="h3" color="primary">
              {section3Header}
            </Typography>
            <Typography
              variant="h3"
              color="secondary"
              className={classes.rightLetter}
            >
              {section3HeaderSpan}
            </Typography>
          </div>
          <div className={classes.innerContainer} />
          {page === 1 && (
            <Testimonial
              author={testimonial1Author}
              text={testimonial1Text.testimonial1Text}
              image={testimonial1Image.fluid}
            />
          )}
          {page === 2 && (
            <Testimonial
              author={testimonial2Author}
              text={testimonial2Text.testimonial2Text}
              image={testimonial2Image.fluid}
            />
          )}
          <Pagination
            size="large"
            page={page}
            count={2}
            onChange={handleChange}
            className={classes.pagination}
          />
        </Container>
      </Fade>
    </section>
  )
}

Testimonials.propTypes = {
  section3SmallHeader: PropTypes.string.isRequired,
  section3Header: PropTypes.string.isRequired,
  section3HeaderSpan: PropTypes.string.isRequired,
  testimonial1Author: PropTypes.string.isRequired,
  testimonial1Text: PropTypes.object.isRequired,
  testimonial1Image: PropTypes.object.isRequired,
  testimonial2Author: PropTypes.string.isRequired,
  testimonial2Text: PropTypes.object.isRequired,
  testimonial2Image: PropTypes.object.isRequired,
}

export default Testimonials
