import React, { useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import Tooltip from "@material-ui/core/Tooltip"
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
  ApiSuccessModal,
  ApiErrorModal,
} from "./modals"
import Loading from "./Loading"
import Appts from "./Appts"
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
  const [successApi, setSuccessApi] = useState(false)
  const [errorApi, setErrorApi] = useState(false)
  const [apiSuccessMessage, setApiSuccessMessage] = useState("")
  const [apiErrorMessage, setApiErrorMessage] = useState("")

  // -------------------- Navbar Method Start -------------------
  const handleFilter = value => {
    setFilter(value)
  }
  // -------------------- Navbar Method End --------------------

  // -------------------- Api Snackbar Methods Start --------------------
  const handleSuccessApiOpen = event => {
    setSuccessApi(true)
  }

  const handleSuccessApiClose = event => {
    setSuccessApi(false)
  }

  const handleErrorApiOpen = event => {
    setErrorApi(true)
  }

  const handleErrorApiClose = event => {
    setErrorApi(false)
  }
  // -------------------- Api Snackbar Methods End --------------------

  // -------------------- Modal Methods Start --------------------
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
  // --- Open create invoice modal ---
  const handleFormModalOpen = () => {
    setFormModal(true)
  }
  // --- Close create invoice modal ---
  const handleFormModalClose = () => {
    setFormModal(false)
  }
  // -------------------- Modal Methods End --------------------

  // -------------------- Search Methods Start --------------------
  const handleChange = event => {
    setSearchTerm(event.target.value)
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

    if (response && response.error === "unauthorized") {
      if (isLocalHost()) {
        console.log(localHostError)
        setApiErrorMessage(localHostError)
        handleErrorApiOpen()
      } else {
        console.log(liveError)
        setApiErrorMessage(liveError)
        handleErrorApiOpen()
      }
      setLoading(false)
      return false
    }
    if (response && response.message) {
      console.log(response.message)
      setApiSuccessMessage(response.message)
      handleSuccessApiOpen()
    }

    if (filter === "customers" && response && response.result.length > 0) {
      setLoading(false)
      setClients(response.result.filter(client => client.data.customer))
    }
    if (filter === "leads" && response && response.result.length > 0) {
      setLoading(false)
      setClients(response.result.filter(client => !client.data.customer))
    }
  }
  // -------------------- Search Methods Start --------------------

  // -------------------- Faunda API Start --------------------

  // --- Get clients from Fauna ---
  const getClients = useCallback(async () => {
    // --- Set loading ui ---
    setLoading(true)
    try {
      // --- Read all clients from Fauna ---
      const response = await faunaApi.readAllClients()
      // --- If not connected to Fauna display error ---
      if (response && response.error === "unauthorized") {
        if (isLocalHost()) {
          console.log(localHostError)
          setApiErrorMessage(localHostError)
          handleErrorApiOpen()
        } else {
          console.log(liveError)
          setApiErrorMessage(liveError)
          handleErrorApiOpen()
        }
        setLoading(false)
        return false
      }
      // ---If connected to Fauna and got response, display success snackbar ---
      if (response && response.message) {
        console.log(response.message)
        setApiSuccessMessage(response.message)
        handleSuccessApiOpen()
      }
      // --- If in customers page, set state clients to customers ---
      if (filter === "customers" && response && response.result.length > 0) {
        setLoading(false)
        setClients(response.result.filter(client => client.data.customer))
      }
      // --- If in leads page, set state clients to leads ---
      if (filter === "leads" && response && response.result.length > 0) {
        setLoading(false)
        setClients(response.result.filter(client => !client.data.customer))
      }
    } catch (error) {
      // --- Display any error in snackbar and unset loading ui ---
      console.log(error.error)
      setApiErrorMessage(error.error)
      handleErrorApiOpen()
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, localHostError, liveError, setApiSuccessMessage])

  // --- Convert client in Fauna from leads/customers
  const handleConvert = async () => {
    // --- Set loading ui
    setLoading(true)
    if (filter === "customers") {
      try {
        // --- Update client in Fauna
        const response = await faunaApi.updateClient(
          targetClient.ref["@ref"].id,
          {
            ...targetClient.data,
            customer: false,
          }
        )
        // --- If got response, display success snackbar ---
        if (response.message) {
          console.log(response.message)
          setApiSuccessMessage(response.message)
          handleSuccessApiOpen()
        }
        // --- Replace state client data with updated data ---
        const filteredClients = clients.filter(
          item => item.ts !== targetClient.ts
        )
        setClients(filteredClients)
      } catch (err1) {
        // --- Display any error in snackbar ---
        console.log(err1.error)
        setApiErrorMessage(err1.error)
        handleErrorApiOpen()
      }
      // --- Unset loading ui ---
      setLoading(false)
    }
    // --- Same logic as above for leads ---
    if (filter === "leads") {
      try {
        const response = await faunaApi.updateClient(
          targetClient.ref["@ref"].id,
          {
            ...targetClient.data,
            customer: true,
          }
        )
        if (response.message) {
          console.log(response.message)
          setApiSuccessMessage(response.message)
          handleSuccessApiOpen()
        }
        const filteredClients = clients.filter(
          item => item.ts !== targetClient.ts
        )
        setClients(filteredClients)
      } catch (err2) {
        console.log(err2.error)
        setApiErrorMessage(err2.error)
        handleErrorApiOpen()
      }
      setLoading(false)
    }
  }

  // --- Delete client in Fauna ---
  const handleClientDelete = async () => {
    // --- Set loading ui ---
    setLoading(true)
    try {
      // --- Delete client in Fauna
      const res1 = await faunaApi.deleteClient(targetClient.ref["@ref"].id)
      // --- If got response, display success snackbar ---
      if (res1.message) {
        console.log(res1.message)
        setApiSuccessMessage(res1.message)
        handleSuccessApiOpen()
      }

      // --- Get all appointments from Fauna ---
      const ret = await faunaApi.readAllAppts()
      // --- If got response, display success snackbar ---
      if (ret.message) {
        console.log(ret.message)
        setApiSuccessMessage(ret.message)
        handleSuccessApiOpen()
      }
      // --- Find matching appointment for the client in result ---
      ret.result.forEach(async appt => {
        if (appt.data.payload.invitee.email === targetClient.data.email) {
          // --- Delete appointment in Fauna ---
          const res = await faunaApi.deleteAppt(appt.ref["@ref"].id)
          // --- If got response, display success snackbar ---
          if (res.message) {
            console.log(res.message)
            setApiSuccessMessage(res.message)
            handleSuccessApiOpen()
          }
        }
      })

      try {
        // --- Delete client in Stripe ---
        const res2 = await stripeApi.deleteClient(targetClient.data.stripe_id)
        // --- If got response, display success snackbar ---
        if (res2.message) {
          console.log(res2.message)
          setApiSuccessMessage(res2.message)
          handleSuccessApiOpen()
        }
        // --- Replace state client data with updated data ---
        const filteredClients = clients.filter(
          item => item.ts !== res1.result.ts
        )
        setClients(filteredClients)
        // --- Unset loading ui ---
        setLoading(false)
      } catch (err1) {
        // --- Display any error in snackbar and unset loading ui ---
        console.log(err1.error)
        setApiErrorMessage(err1.error)
        handleErrorApiOpen()
        setLoading(false)
      }
    } catch (err2) {
      // --- Display any error in snackbar and unset loading ui ---
      console.log(err2.error)
      setApiErrorMessage(err2.error)
      handleErrorApiOpen()
      setLoading(false)
    }
  }
  // -------------------- Faunda API End --------------------

  // -------------------- Stripe API Start --------------------

  // --- Get services from Stripe ---
  const getServices = useCallback(async () => {
    // --- Set loading ui ---
    setLoading(true)
    try {
      // --- Read all services from Stripe ---
      const result = await stripeApi.listServices()
      // --- If got response, display success snackbar ---
      if (result.message) {
        console.log(result.message)
        setApiSuccessMessage(result.message)
        handleSuccessApiOpen()
      }
      // --- Set data for create invoices modal with result(services) ---
      setFormModalData(result.result.data)
      // --- Unset loading ui
      setLoading(false)
    } catch (err) {
      // --- Display any error in snackbar and unset loading ui ---
      console.log(err.error)
      setApiErrorMessage(err.error)
      handleErrorApiOpen()
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setApiSuccessMessage])

  // --- Get invoices from Stripe ---
  const getInvoices = async id => {
    // --- Set loading ui ---
    setLoading(true)
    try {
      // --- Get all invoices from Stripe ---
      const result = await stripeApi.listInvoices(id)
      // --- If got response, display success snackbar ---
      if (result.message) {
        console.log(result.message)
        setApiSuccessMessage(result.message)
        handleSuccessApiOpen()
      }
      // --- Set data for invoices list modal with result ---
      setInvoicesModalData(result.result)
      // --- Unset loading ui ---
      setLoading(false)
    } catch (err) {
      // --- Display any error in snackbar and unset loading ui ---
      console.log(err.error)
      setApiErrorMessage(err.error)
      handleErrorApiOpen()
      setLoading(false)
    }
  }

  // --- Create invoice in Stripe ---
  const handleInvoiceCreate = async data => {
    // --- Set loading ui ---
    setLoading(true)
    try {
      // --- Create invoice in Stripe ---
      const result = await stripeApi.createInvoice(modalData.stripe_id, data)
      // --- If got response, display success snackbar ---
      if (result.message) {
        console.log(result.message)
        setApiSuccessMessage(result.message)
        handleSuccessApiOpen()
      }
      // --- Unset loading ui ---
      setLoading(false)
    } catch (err) {
      // --- Display any error in snackbar and unset loading ui ---
      console.log(err.error)
      setApiErrorMessage(err.error)
      handleErrorApiOpen()
      setLoading(false)
    }
  }

  // --- Delete invoice in Stripe ---
  const handleInvoiceDelete = async id => {
    // --- Set loading ui ---
    setLoading(true)
    try {
      // --- Delete invoice in Stripe ---
      const result = await stripeApi.deleteInvoice(id)
      // --- If got response, display success snackbar ---
      if (result.message) {
        console.log(result.message)
        setApiSuccessMessage(result.message)
        handleSuccessApiOpen()
      }
      // --- Replace state/modal invoice data with updated data ---
      const filteredData = invoicesModalData.filter(
        item => item.id !== result.result.id
      )
      setInvoicesModalData(filteredData)

      // --- Appointment api/logic ---
      // --- Get appointments from Fauna ---
      const response = await faunaApi.readAllAppts()
      // --- If got response, display success snackbar ---
      if (response.message) {
        console.log(response.message)
        setApiSuccessMessage(response.message)
        handleSuccessApiOpen()
      }

      // --- Find the appointment in result with deleted invoice and delete ---
      response.result.forEach(async appt => {
        if (
          appt.data.invoice.hasOwnProperty("id") &&
          appt.data.invoice.id === result.result.id
        ) {
          const res = await faunaApi.updateAppt(appt.ref["@ref"].id, {
            invoice: {},
          })
          // --- If got response, display success snackbar ---
          if (res.message) {
            console.log(res.message)
            setApiSuccessMessage(res.message)
            handleSuccessApiOpen()
          }
        }
      })
      // --- End appointment api/logic ---
      // --- Unset loading ui ---
      setLoading(false)
    } catch (err) {
      // --- Display any error in snackbar and unset loading ui ---
      console.log(err.error)
      setApiErrorMessage(err.error)
      handleErrorApiOpen()
      setLoading(false)
    }
  }

  // --- Send invoice to customer via Stripe ---
  const handleSendInvoice = async id => {
    // --- Set loading ui ---
    setLoading(true)
    try {
      // --- Send invoice via Stripe ---
      const result = await stripeApi.sendInvoice(id)
      // --- If got response, display success snackbar ---
      if (result.message) {
        console.log(result.message)
        setApiSuccessMessage(result.message)
        handleSuccessApiOpen()
      }
      // --- Replace state/modal invoice data with updated data ---
      let index = invoicesModalData.findIndex(
        item => item.id === result.result.id
      )
      if (index !== -1) {
        invoicesModalData[index] = result.result
      }

      // --- Appointments api logic ---
      // --- Get appointments from Fauna ---
      const response = await faunaApi.readAllAppts()
      // --- If got response, display success snackbar ---
      if (response.message) {
        console.log(response.message)
        setApiSuccessMessage(response.message)
        handleSuccessApiOpen()
      }

      // --- Find the appointment in result with sent invoice and update ---
      response.result.forEach(async appt => {
        if (
          appt.data.invoice.hasOwnProperty("id") &&
          appt.data.invoice.id === result.result.id
        ) {
          const res = await faunaApi.updateAppt(appt.ref["@ref"].id, {
            invoice: result.result,
          })
          // --- If got response, display success snackbar ---
          if (res.message) {
            console.log(res.message)
            setApiSuccessMessage(res.message)
            handleSuccessApiOpen()
          }
        }
      })
      // --- End appointment api ---
      // --- Unset loading api ---
      setLoading(false)
    } catch (err) {
      // --- Display any error in snackbar and unset loading ui ---
      console.log(err.error)
      setApiErrorMessage(err.error)
      handleErrorApiOpen()
      setLoading(false)
    }
  }

  // --- Voice invoice in Stripe ---
  const handleVoidInvoice = async id => {
    // --- Set loading ui ---
    setLoading(true)
    try {
      // --- Voice invoice in Stripe ---
      const result = await stripeApi.voidInvoice(id)
      // --- If got response, display success snackbar ---
      if (result.message) {
        console.log(result.message)
        setApiSuccessMessage(result.message)
        handleSuccessApiOpen()
      }
      // --- Replace state/modal invoice data with updated data ---
      let index = invoicesModalData.findIndex(
        item => item.id === result.result.id
      )
      if (index !== -1) {
        invoicesModalData[index] = result.result
      }

      // --- Appointments api logic ---
      // --- Get appointments from Fauna ---
      const response = await faunaApi.readAllAppts()
      // --- If got response, display success snackbar ---
      if (response.message) {
        console.log(response.message)
        setApiSuccessMessage(response.message)
        handleSuccessApiOpen()
      }

      // --- Find the appointment in result with voided invoice and update ---
      response.result.forEach(async appt => {
        if (
          appt.data.invoice.hasOwnProperty("id") &&
          appt.data.invoice.id === result.result.id
        ) {
          const res = await faunaApi.updateAppt(appt.ref["@ref"].id, {
            invoice: result.result,
          })
          // --- If got response, display success snackbar ---
          if (res.message) {
            console.log(res.message)
            setApiSuccessMessage(res.message)
            handleSuccessApiOpen()
          }
        }
      })
      // --- End appointment api ---
      // --- Unset loading ui ---
      setLoading(false)
    } catch (err) {
      // --- Display any error in snackbar and unset loading ui ---
      console.log(err.error)
      setApiErrorMessage(err.error)
      handleErrorApiOpen()
      setLoading(false)
    }
  }
  // -------------------- Stripe API End --------------------

  // -------------------- Start component logic --------------------
  useEffect(() => {
    // --- Get clients from Fauna ---
    getClients()
    // ---Get Services from Stripe---
    getServices()
  }, [getClients, getServices])

  return (
    <>
      {/* --- Navbar Start --- */}
      <Navbar
        logo={logo}
        siteTitle={siteTitle}
        signoutHeader={signoutHeader}
        setFilter={handleFilter}
        logout={logout}
      />
      {/* --- Navbar End --- */}
      <main className={classes.root}>
        <Container maxWidth="xl" className={classes.container}>
          {/* --- Header (customers/leads) --- */}
          <Typography variant="h1" className={classes.header}>
            {filter === "customers"
              ? customerHeader
              : filter === "leads"
              ? leadHeader
              : apptHeader}
          </Typography>
          {/* --- If filter is set to appointments set screen --- */}
          {filter === "appts" ? (
            <Appts
              localHostError={localHostError}
              liveError={liveError}
              setLoading={setLoading}
              formModalData={formModalData}
              invoiceHeader={invoiceHeader}
              handleSuccessApiOpen={handleSuccessApiOpen}
              setApiSuccessMessage={setApiSuccessMessage}
              handleErrorApiOpen={handleErrorApiOpen}
              setApiErrorMessage={setApiErrorMessage}
            />
          ) : (
            // --- Otherwise set screen to clients screen ---
            <>
              {/* --- Search bar start --- */}
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
              <Tooltip title="Reset all clients" arrow>
                <IconButton
                  className={classes.iconPrimary}
                  aria-label="reset"
                  component="span"
                  onClick={handleReset}
                >
                  <ReplayIcon />
                </IconButton>
              </Tooltip>
              {/* --- Search bar end --- */}

              {/* --- Clients list start --- */}
              <Paper elevation={1} className={classes.paper}>
                {clients.map(client => (
                  <List aria-label="client list" key={client.ts}>
                    <ListItem button>
                      {/* --- Client name --- */}
                      <ListItemText
                        primary={
                          <Typography variant="body2">
                            {client.data.name}
                          </Typography>
                        }
                        onClick={() => handleClientModalOpen(client.data)}
                      />
                      {/* --- Convert to customers/leads icon --- */}
                      <Tooltip
                        title={
                          filter === "customers"
                            ? "Convert to lead"
                            : filter === "leads"
                            ? "Convert to customer"
                            : null
                        }
                        arrow
                      >
                        <ListItemIcon>
                          <RestorePageIcon
                            className={classes.icon}
                            onClick={() => handleConvertModalOpen(client)}
                          />
                        </ListItemIcon>
                      </Tooltip>
                      {/* --- Delete client icon --- */}
                      <Tooltip title="Delete customer" arrow>
                        <ListItemIcon>
                          <DeleteForeverIcon
                            className={classes.icon}
                            onClick={() => handleDeleteModalOpen(client)}
                          />
                        </ListItemIcon>
                      </Tooltip>
                    </ListItem>
                  </List>
                  //  --- Clients list end ---
                ))}
              </Paper>

              {/* --- Modals start --- */}
              <ClientModal
                open={clientModal}
                onClose={handleClientModalClose}
                data={modalData}
                header={customerDetails}
                getInvoices={getInvoices}
                setInvoiceName={setInvoiceName}
                invoicesModalOpen={handleInvoicesModalOpen}
                handleFormModalOpen={handleFormModalOpen}
                localHostError={localHostError}
                liveError={liveError}
                setLoading={setLoading}
                handleSuccessApiOpen={handleSuccessApiOpen}
                setApiSuccessMessage={setApiSuccessMessage}
                handleErrorApiOpen={handleErrorApiOpen}
                setApiErrorMessage={setApiErrorMessage}
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
              {/* --- Modals end --- */}
            </>
          )}
        </Container>

        {/* ---Loading Modal--- */}
        <Loading loading={loading} />

        {/* --- Success snackbar --- */}
        {successApi && (
          <ApiSuccessModal
            open={successApi}
            message={apiSuccessMessage}
            handleClose={handleSuccessApiClose}
          />
        )}

        {/* --- Error snackbar --- */}
        {errorApi && (
          <ApiErrorModal
            open={errorApi}
            message={apiErrorMessage}
            handleClose={handleErrorApiClose}
          />
        )}
      </main>
      {/* --- Footer --- */}
      <footer className={classes.footer}>
        <Container maxWidth="xl">
          <Grid container>
            <Grid
              item
              lg={6}
              xs={12}
              className={classes.copyrightContainerLeft}
            >
              <Typography variant="caption" className={classes.copyright}>
                © {new Date().getFullYear()} {company}
              </Typography>
            </Grid>
            <Grid
              item
              lg={6}
              xs={12}
              className={classes.copyrightContainerRight}
            >
              <Typography variant="caption" className={classes.copyright}>
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
