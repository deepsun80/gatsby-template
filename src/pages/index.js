import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/core/styles"
import Dashboard from "../components/Dashboard"
import theme from "../utils/theme"
import logo from "../images/logo.png"
import { graphql } from "gatsby"
import IdentityModal, {
  useIdentityContext,
} from "react-netlify-identity-widget"
import "../layouts/layout.css"
import "react-netlify-identity-widget/styles.css"

const Admin = ({ data }) => {
  const {
    customer,
    lead,
    customerDetails,
    customerDelete,
    navbar,
  } = data.markdownRemark.frontmatter

  const identity = useIdentityContext()
  const name =
    (identity &&
      identity.user &&
      identity.user.user_metadata &&
      identity.user.user_metadata.name) ||
    "NoName"
  const isLoggedIn = identity && identity.isLoggedIn

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoggedIn || process.env.NODE_ENV !== "production" ? (
        <Dashboard
          customerHeader={customer}
          leadHeader={lead}
          customerDetails={customerDetails}
          customerDelete={customerDelete}
          logo={logo}
          siteTitle={data.site.siteMetadata.title}
          signoutHeader={navbar}
          logout={identity.logoutUser}
          author={data.site.siteMetadata.author}
          company={data.site.siteMetadata.data.company}
        />
      ) : (
        <IdentityModal
          showDialog={true}
          onLogin={user => console.log("hello ", user.user_metadata)}
          onLogout={() => console.log("bye ", name)}
          onSignup={user => console.log("welcome ", user.user_metadata)}
        />
      )}
    </ThemeProvider>
  )
}

export const data = graphql`
  query {
    site {
      siteMetadata {
        title
        author
        data {
          company
        }
      }
    }
    markdownRemark(frontmatter: { path: { eq: "/admin" } }) {
      frontmatter {
        customer
        lead
        customerDetails
        customerDelete
        navbar
      }
    }
  }
`

export default Admin
