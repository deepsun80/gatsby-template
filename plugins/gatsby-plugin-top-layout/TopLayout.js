import React from "react"
import PropTypes from "prop-types"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
import theme from "../../src/utils/theme"

const TopLayout = props => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </>
  )
}

TopLayout.propTypes = {
  children: PropTypes.node,
}

export default TopLayout
