import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
import Navbar from "../components/Navbar"
import Dashboard from "../components/Dashboard"
import theme from "../utils/theme"
import logo from "../images/logo.png"
import { useStaticQuery, graphql } from "gatsby"
import "../layouts/layout.css"

const Admin = () => {
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
      }
    `
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar logo={logo} siteTitle={query.site.siteMetadata.title} />
      <Dashboard />
    </ThemeProvider>
  )
}

export default Admin
