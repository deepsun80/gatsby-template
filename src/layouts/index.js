import React from "react"
import PropTypes from "prop-types"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer/Footer1"
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
            author
            data {
              tel
              company
            }
          }
        }
      }
    `
  )

  return (
    <>
      <Navbar
        logo={logo}
        siteTitle={query.site.siteMetadata.title}
        scroll
        web
      />
      <main>{children}</main>
      <Footer
        logo={logo}
        siteTitle={query.site.siteMetadata.title}
        author={query.site.siteMetadata.author}
        company={query.site.siteMetadata.data.company}
        tel={query.site.siteMetadata.data.tel}
      />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
