import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer/Footer1'
import SEO from '../components/SEO'
import theme from '../utils/theme'
import logo from '../images/logo.png'
import useSiteMetadata from './SiteMetadata'

const Layout = ({ children }) => {
  const { title } = useSiteMetadata()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SEO />
      <Navbar logo={logo} siteTitle={title} scroll />
      <main>{children}</main>
      <Footer logo={logo} siteTitle={title} />
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
