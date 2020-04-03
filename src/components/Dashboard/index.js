import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import ReplayIcon from "@material-ui/icons/Replay"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import RestorePageIcon from "@material-ui/icons/RestorePage"
import {
  ClientModal,
  DeleteModal,
  CreateInvoiceModal,
  ConvertModal,
  InvoicesModal,
} from "./modals"
import Loading from "./Loading"
import Appt from "./Appt"
import Navbar from "../Navbar"
import faunaApi from "../../utils/faunaApi"
import stripeApi from "../../utils/stripeApi"
import isLocalHost from "../../utils/isLocalHost"
import useStyles from "./style"

const Dashboard = ({
  customerHeader,
  leadHeader,
  apptHeader,
  customerDetails,
  customerDelete,
  customerConvert,
  leadConvert,
  logo,
  siteTitle,
  signoutHeader,
  logout,
  author,
  company,
  invoiceHeader,
  localHostError,
  liveError,
}) => {
  const classes = useStyles()

  const [clients, setClients] = useState([])
  const [clientModal, setClientModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [convertModal, setConvertModal] = useState(false)
  const [invoiceName, setInvoiceName] = useState("")
  const [invoicesModal, setInvoicesModal] = useState(false)
  const [formModal, setFormModal] = useState(false)
  const [modalData, setModalData] = useState({})
  const [invoicesModalData, setInvoicesModalData] = useState([])
  const [targetClient, setTargetClient] = useState({})
  const [filter, setFilter] = useState("customers")
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [formModalData, setFormModalData] = useState([])

  // --- Modals Start ---
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

  const handleConvertModalOpen = data => {
    setConvertModal(true)
    setTargetClient(data)
  }

  const handleDeleteModalClose = () => {
    setDeleteModal(false)
  }

  const handleConvertModalClose = () => {
    setConvertModal(false)
  }

  const handleInvoicesModalOpen = () => {
    setInvoicesModal(true)
  }

  const handleInvoicesModalClose = () => {
    setInvoicesModal(false)
  }

  const handleFormModalOpen = () => {
    setFormModal(true)
  }

  const handleFormModalClose = () => {
    setFormModal(false)
  }
  // --- Modals End ---

  const handleChange = event => {
    setSearchTerm(event.target.value)
  }

  // --- Faunda API Start ---
  const handleConvert = async () => {
    setLoading(true)
    if (filter === "customers") {
      try {
        const response = await faunaApi.update(targetClient.ref["@ref"].id, {
          ...targetClient.data,
          customer: false,
        })
        console.log("Client updated:", response)
        const filteredClients = clients.filter(
          item => item.ts !== targetClient.ts
        )
        setClients(filteredClients)
      } catch (err1) {
        alert("There was an error converting client", err1)
      }
      setLoading(false)
    }
    if (filter === "leads") {
      try {
        const response = await faunaApi.update(targetClient.ref["@ref"].id, {
          ...targetClient.data,
          customer: true,
        })
        console.log("Client updated:", response)
        const filteredClients = clients.filter(
          item => item.ts !== targetClient.ts
        )
        setClients(filteredClients)
      } catch (err2) {
        alert("There was an error converting client", err2)
      }
      setLoading(false)
    }
  }

  const handleClientDelete = async () => {
    setLoading(true)
    try {
      const res1 = await faunaApi.delete(targetClient.ref["@ref"].id)
      console.log("Client deleted:", res1)

      try {
        const res2 = await stripeApi.deleteClient(targetClient.data.stripe_id)
        console.log("Client deleted from Stripe:", res2)
        const filteredClients = clients.filter(item => item.ts !== res1.ts)
        setClients(filteredClients)
        setLoading(false)
      } catch (err1) {
        alert("There was an error removing client", err1)
        setLoading(false)
      }
    } catch (err2) {
      alert("There was an error removing client", err2)
      setLoading(false)
    }
  }

  const handleFilter = value => {
    setFilter(value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    let filteredClients = []

    clients.forEach(client => {
      if (client.data.name.includes(searchTerm)) filteredClients.push(client)
    })
    if (filteredClients.length > 0) setClients(filteredClients)
  }

  const handleReset = async () => {
    setLoading(true)

    const response = await faunaApi.readAllClients()

    if (response.message === "unauthorized") {
      if (isLocalHost()) {
        alert(localHostError)
      } else {
        alert(liveError)
      }
      setLoading(false)
      return false
    }

    if (filter === "customers") {
      setLoading(false)
      setClients(response.filter(client => client.data.customer))
    }
    if (filter === "leads") {
      setLoading(false)
      setClients(response.filter(client => !client.data.customer))
    }
  }
  // --- Faunda API End ---

  // --- Stripe API Start ---
  const getInvoices = async id => {
    setLoading(true)
    try {
      const result = await stripeApi.listInvoices(id)
      console.log("Stripe invoices for customer:", result)
      setInvoicesModalData(result.result)
      setLoading(false)
    } catch (err) {
      alert("There was an error getting invoices", err)
      setLoading(false)
    }
  }

  const handleInvoiceCreate = async data => {
    setLoading(true)
    try {
      const result = await stripeApi.createInvoice(modalData.stripe_id, data)
      console.log("Stripe invoice created:", result)
      setLoading(false)
    } catch (err) {
      alert("There was an error creating the invoice", err)
      setLoading(false)
    }
  }

  const handleInvoiceDelete = async id => {
    setLoading(true)
    try {
      const result = await stripeApi.deleteInvoice(id)
      console.log("Stripe invoice deleted:", result)

      const filteredData = invoicesModalData.filter(
        item => item.id !== result.result.id
      )
      setInvoicesModalData(filteredData)
      setLoading(false)
    } catch (err) {
      alert("There was an error deleting invoice", err)
      setLoading(false)
    }
  }

  const handleSendInvoice = async id => {
    setLoading(true)
    try {
      const result = await stripeApi.sendInvoice(id)
      console.log("Stripe invoice sent:", result)

      let index = invoicesModalData.findIndex(
        item => item.id === result.result.id
      )
      if (index !== -1) {
        invoicesModalData[index] = result.result
      }
      setLoading(false)
    } catch (err) {
      alert("There was an error sending invoice", err)
      setLoading(false)
    }
  }

  const handleVoidInvoice = async id => {
    setLoading(true)
    try {
      const result = await stripeApi.voidInvoice(id)
      console.log("Stripe invoice voided:", result)

      let index = invoicesModalData.findIndex(
        item => item.id === result.result.id
      )
      if (index !== -1) {
        invoicesModalData[index] = result.result
      }
      setLoading(false)
    } catch (err) {
      console.log("There was an error voiding invoice", err)
      setLoading(false)
    }
  }
  // --- Stripe API End ---

  useEffect(() => {
    // ---Get clients from Faunda---
    const getClients = async () => {
      setLoading(true)

      const response = await faunaApi.readAllClients()

      if (response.message === "unauthorized") {
        if (isLocalHost()) {
          alert(localHostError)
        } else {
          alert(liveError)
        }
        setLoading(false)
        return false
      }

      if (filter === "customers") {
        setLoading(false)
        setClients(response.filter(client => client.data.customer))
      }
      if (filter === "leads") {
        setLoading(false)
        setClients(response.filter(client => !client.data.customer))
      }
    }

    // ---Get Services---
    const getServices = async () => {
      setLoading(true)
      try {
        const result = await stripeApi.listServices()
        console.log("Stripe skus:", result)
        setFormModalData(result.result.data)
        setLoading(false)
      } catch (err) {
        alert("There was an error getting skus", err)
        setLoading(false)
      }
    }

    getClients()
    getServices()
  }, [filter, localHostError, liveError])

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
            {filter === "customers"
              ? customerHeader
              : filter === "leads"
              ? leadHeader
              : apptHeader}
          </Typography>

          {filter === "appts" ? (
            <Appt
              localHostError={localHostError}
              liveError={liveError}
              setLoading={setLoading}
            />
          ) : (
            <>
              <Paper
                component="form"
                elevation={1}
                className={classes.searchField}
                onSubmit={handleSubmit}
              >
                <InputBase
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleChange}
                  name="search"
                  id="search"
                  inputProps={{ "aria-label": "search" }}
                  className={classes.input}
                />
                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>

              <IconButton
                color="secondary"
                aria-label="reset"
                component="span"
                onClick={handleReset}
              >
                <ReplayIcon />
              </IconButton>

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
                        <RestorePageIcon
                          className={classes.icon}
                          onClick={() => handleConvertModalOpen(client)}
                        />
                      </ListItemIcon>
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
                getInvoices={getInvoices}
                setInvoiceName={setInvoiceName}
                invoicesModalOpen={handleInvoicesModalOpen}
                handleFormModalOpen={handleFormModalOpen}
              />
              <DeleteModal
                open={deleteModal}
                onClose={handleDeleteModalClose}
                header={customerDelete}
                handleDelete={handleClientDelete}
              />
              <ConvertModal
                open={convertModal}
                onClose={handleConvertModalClose}
                header={filter === "customers" ? customerConvert : leadConvert}
                handleConvert={handleConvert}
              />
              <InvoicesModal
                open={invoicesModal}
                onClose={handleInvoicesModalClose}
                header={`${invoiceName} invoices`}
                data={invoicesModalData}
                handleDelete={handleInvoiceDelete}
                handleSend={handleSendInvoice}
                handleVoid={handleVoidInvoice}
              />
              <CreateInvoiceModal
                open={formModal}
                onClose={handleFormModalClose}
                header={invoiceHeader}
                handleCreate={handleInvoiceCreate}
                data={formModalData}
              />
            </>
          )}
        </Container>

        {/* ---Loading Modal--- */}
        <Loading loading={loading} />
      </main>
      <footer className={classes.footer}>
        <Container maxWidth="xl">
          <Grid container>
            <Grid
              item
              lg={6}
              xs={12}
              className={classes.copyrightContainerLeft}
            >
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
              className={classes.copyrightContainerRight}
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
  apptHeader: PropTypes.string.isRequired,
  customerDetails: PropTypes.string.isRequired,
  customerDelete: PropTypes.string.isRequired,
  customerConvert: PropTypes.string.isRequired,
  leadConvert: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  siteTitle: PropTypes.string.isRequired,
  signoutHeader: PropTypes.string.isRequired,
  logout: PropTypes.func,
  author: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  invoiceHeader: PropTypes.string.isRequired,
  localHostError: PropTypes.string.isRequired,
  liveError: PropTypes.string.isRequired,
}

export default Dashboard
