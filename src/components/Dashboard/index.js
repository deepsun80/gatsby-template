import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import ClientModal from "./ClientModal"
import DeleteModal from "./DeleteModal"
import Navbar from "../Navbar"
import api from "../../utils/api"
import isLocalHost from "../../utils/isLocalHost"
import useStyles from "./style"

const Dashboard = ({
  customerHeader,
  leadHeader,
  customerDetails,
  customerDelete,
  logo,
  siteTitle,
  signoutHeader,
  logout,
  author,
  company,
}) => {
  const classes = useStyles()

  const [clients, setClients] = useState([])
  const [clientModal, setClientModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const [targetClient, setTargetClient] = useState({})
  const [filter, setFilter] = useState(true)

  const handleClientModalOpen = data => {
    setClientModal(true)
    setModalData(data)
  }

  const handleClientModalClose = () => {
    setClientModal(false)
  }

  const handleDeleteModalOpen = data => {
    setDeleteModal(true)
    setTargetClient(data)
  }

  const handleDeleteModalClose = () => {
    setDeleteModal(false)
  }

  const handleDelete = async () => {
    try {
      const response = await api.delete(targetClient.ref["@ref"].id)
      const filteredClients = clients.filter(item => item.ts !== response.ts)
      setClients(filteredClients)
    } catch (err) {
      console.log(`There was an error removing client`, err)
    }
  }

  const handleFilter = bool => {
    setFilter(bool)
  }

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

      if (filter) setClients(response.filter(client => client.data.customer))
      else setClients(response.filter(client => !client.data.customer))
    }

    getClients()
  }, [filter])

  return (
    <>
      <Navbar
        logo={logo}
        siteTitle={siteTitle}
        signoutHeader={signoutHeader}
        setFilter={handleFilter}
        logout={logout}
      />
      <main className={classes.root}>
        <Container maxWidth="xl" className={classes.container}>
          <Typography variant="h1" color="primary" className={classes.header}>
            {filter ? customerHeader : leadHeader}
          </Typography>
          <Paper elevation={1} className={classes.paper}>
            {clients.map(client => (
              <List aria-label="client list" key={client.ts}>
                <ListItem button>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="primary">
                        {client.data.name}
                      </Typography>
                    }
                    onClick={() => handleClientModalOpen(client.data)}
                  />
                  <ListItemIcon>
                    <DeleteForeverIcon
                      className={classes.icon}
                      onClick={() => handleDeleteModalOpen(client)}
                    />
                  </ListItemIcon>
                </ListItem>
              </List>
            ))}
          </Paper>
          <ClientModal
            open={clientModal}
            onClose={handleClientModalClose}
            data={modalData}
            header={customerDetails}
          />
          <DeleteModal
            open={deleteModal}
            onClose={handleDeleteModalClose}
            header={customerDelete}
            handleDelete={handleDelete}
          />
        </Container>
      </main>
      <footer className={classes.footer}>
        <Container maxWidth="xl">
          <Grid container>
            <Grid item lg={6} xs={12} className={classes.copyrightContainer}>
              <Typography
                variant="caption"
                color="primary"
                className={classes.copyright}
              >
                © {new Date().getFullYear()} {company}
              </Typography>
            </Grid>
            <Grid
              item
              lg={6}
              xs={12}
              className={classes.copyrightContainer}
              style={{ textAlign: "right" }}
            >
              <Typography
                variant="caption"
                color="primary"
                className={classes.copyright}
              >
                website by {author}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </>
  )
}

Dashboard.defaultProps = {
  logout: () => {},
}

Dashboard.propTypes = {
  customerHeader: PropTypes.string.isRequired,
  leadHeader: PropTypes.string.isRequired,
  customerDetails: PropTypes.string.isRequired,
  customerDelete: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
  signoutHeader: PropTypes.string.isRequired,
  logout: PropTypes.func,
  author: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
}

export default Dashboard
