require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Gatsby Template",
    description: "Gatsby template for static sites.",
    author: "Sandeep Chandran",
    data: {
      tel: "648.244.1060",
      company: "Company Name",
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-top-layout`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdown`,
        name: `markdown`,
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Raleway", "Roboto Slab", "Roboto", "Roboto Condensed"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-smoothscroll`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-template`,
        short_name: `template`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#c5cae9`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/admin/*`] },
    },
    {
      resolve: `gatsby-plugin-netlify-identity`,
      options: {
        url: "https://gatsby-template.netlify.com",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
