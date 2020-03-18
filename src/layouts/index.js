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
            data {
              tel
            }
          }
        }
        markdownRemark(frontmatter: { path: { eq: "*" } }) {
          frontmatter {
            copy
          }
        }
      }
    `
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar logo={logo} siteTitle={query.site.siteMetadata.title} scroll web/>
      <main>{children}</main>
      <Footer
        logo={logo}
        siteTitle={query.site.siteMetadata.title}
        text={query.markdownRemark.frontmatter.copy}
        tel={query.site.siteMetadata.data.tel}
      />
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
