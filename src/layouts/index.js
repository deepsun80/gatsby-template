import React from "react"
import PropTypes from "prop-types"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer/Footer1"
import theme from "../utils/theme"
import logo from "../images/logo.png"
import { useStaticQuery, graphql } from "gatsby"
import "./layout.css"

const Layout = ({ children }) => {
  const query = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        footer: contentfulHomePage {
          footerText
        }
      }
    `
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar logo={logo} siteTitle={query.site.siteMetadata.title} scroll />
      <main>{children}</main>
      <Footer
        logo={logo}
        siteTitle={query.site.siteMetadata.title}
        text={query.footer.footerText}
      />
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
