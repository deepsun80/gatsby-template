/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import JsonLd from "./JsonLd"

const SEO = ({ title, description, home }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author
            data {
              tel
            }
          }
        }
      }
    `
  )

  return (
    <Helmet>
      <meta charset="utf-8" />
      <html lang="en" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <meta content={description} name="description" />
      <meta content={site.siteMetadata.author} name="author" />
      <meta content={site.siteMetadata.title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content="website" property="og:type" />
      <meta content="summary" property="twitter:card" />
      <meta content={site.siteMetadata.author} property="twitter:creator" />
      <meta content={site.siteMetadata.title} property="twitter:title" />
      <meta content={description} property="twitter:description" />
      <title>
        {title} | {site.siteMetadata.title}
      </title>
      {home && (
        <JsonLd>
          {{
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            url: "https://gatsby-template.netlify.com/",
            name: "Gatsby lawncare template",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: site.siteMetadata.data.tel,
              contactType: "Customer service",
            },
          }}
        </JsonLd>
      )}
    </Helmet>
  )
}

SEO.defaultProps = {
  title: "",
  description: "",
  home: false,
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  home: PropTypes.bool,
}

export default SEO
