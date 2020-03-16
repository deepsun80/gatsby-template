import React, { useState, useEffect } from "react"
import api from "../utils/api"

const Admin = () => {
  const [values, setValues] = useState({
    name: "",
    address: "",
  })

  useEffect(() => {
    const readClients = async () => {
      const response = await api.readAll()
      // const data = await response.json()
      console.log(response)
    }

    readClients()
  })

  const handleSubmit = event => {
    event.preventDefault()
    console.log(values)
  }

  const handleChange = (event, value) => {
    setValues({ name: value })
  }

  return (
    <div>
      <h1>Clients</h1>
      <h2>Add Clients</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Admin
