/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer/Footer1'
import SEO from '../components/SEO'
import theme from '../utils/theme'
import logo from '../images/logo.png'
import { useStaticQuery, graphql } from 'gatsby'

const Layout = ({ children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SEO />
      <Navbar logo={logo} siteTitle={site.siteMetadata.title} scroll />
      <main>{children}</main>
      <Footer logo={logo} siteTitle={site.siteMetadata.title} />
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
