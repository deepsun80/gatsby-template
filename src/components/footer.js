import React from 'react'

const footer = () => {
  return (
    <footer style={{ paddingTop: 10 }}>
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  )
}

export default footer
