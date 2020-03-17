import React, { useState, useEffect } from "react"
import Container from "@material-ui/core/Container"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import api from "../utils/api"
import isLocalHost from "../utils/isLocalHost"

const Admin = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
  })
  const [clients, setClients] = useState([])

  useEffect(() => {
    const getClients = async () => {
      const response = await api.readAll()

      if (response.message === "unauthorized") {
        if (isLocalHost()) {
          alert(
            "FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info"
          )
        } else {
          alert(
            "FaunaDB key is not unauthorized. Verify the key `FAUNADB_SERVER_SECRET` set in Netlify enviroment variables is correct"
          )
        }
        return false
      }

      setClients(response)
    }

    getClients()
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const response = await api.create(values)
      console.log(response)
    } catch (err) {
      console.log("An API error occurred", err)
    }
  }

  const handleChange = event => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleRemove = async id => {
    try {
      const response = await api.delete(id)
      console.log(response)
    } catch (err) {
      console.log(`There was an error removing ${id}`, err)
    }
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
      <Container>
        {clients.map(client => (
          <List aria-label="client list" key={client.ts}>
            <ListItem button>
              <ListItemText primary={client.data.name} />
              <ListItemIcon>
                <DeleteForeverIcon
                  color="primary"
                  onClick={() => handleRemove(client.ref["@ref"].id)}
                />
              </ListItemIcon>
            </ListItem>
          </List>
        ))}
      </Container>
    </div>
  )
}

export default Admin
