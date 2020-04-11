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

const SEO = ({ title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
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
      <meta description={site.siteMetadata.description} />
      <meta content={site.siteMetadata.title} property="og:title" />
      <meta content={site.siteMetadata.description} property="og:description" />
      <meta content="website" property="og:type" />
      <meta content="summary" property="twitter:card" />
      <meta content={site.siteMetadata.author} property="twitter:creator" />
      <meta content={site.siteMetadata.title} property="twitter:title" />
      <meta
        content={site.siteMetadata.description}
        property="twitter:description"
      />
      <title>{title || site.siteMetadata.title}</title>
    </Helmet>
  )
}

SEO.defaultProps = {
  title: "",
}

SEO.propTypes = {
  title: PropTypes.string,
}

export default SEO
