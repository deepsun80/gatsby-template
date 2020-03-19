import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
import Navbar from "../../components/Navbar"
import Dashboard from "../../components/Dashboard"
import theme from "../../utils/theme"
import logo from "../../images/logo.png"
import { graphql } from "gatsby"
import "../../layouts/layout.css"

const Leads = ({ data }) => {
  const {
    lead,
    customerDetails,
    customerDelete,
  } = data.markdownRemark.frontmatter

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar logo={logo} siteTitle={data.site.siteMetadata.title} />
      <Dashboard
        header={lead}
        customerDetails={customerDetails}
        customerDelete={customerDelete}
      />
    </ThemeProvider>
  )
}

export const data = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: "/admin" } }) {
      frontmatter {
        customer
        lead
        customerDetails
        customerDelete
      }
    }
  }
`

export default Leads
