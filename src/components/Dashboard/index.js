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
import { FaCcStripe } from "react-icons/fa"
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
  CreateSubModal,
  ConvertModal,
  InvoicesModal,
  SubModal,
  ApiSuccessModal,
  ApiErrorModal,
} from "./modals"
import Loading from "./Loading"
import Appts from "./Appts"
import Navbar from "../Navbar"
import faunaApi from "../../utils/faunaApi"
import stripeApi from "../../utils/stripeApi"
import twilioApi from "../../utils/twilioApi"
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
  subscriptionHeader,
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
  const [subModal, setSubModal] = useState(false)

  const [formInvModal, setInvFormModal] = useState(false)
  const [formInvModalData, setInvFormModalData] = useState([])
  const [formSubModal, setSubFormModal] = useState(false)
  const [formSubModalData, setSubFormModalData] = useState([])

  const [modalData, setModalData] = useState({})
  const [invoicesModalData, setInvoicesModalData] = useState([])
  const [subModalData, setSubModalData] = useState([])
  const [targetClient, setTargetClient] = useState({})
  const [filter, setFilter] = useState("appts")
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
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

  const handleSubModalOpen = () => {
    setSubModal(true)
  }

  const handleSubModalClose = () => {
    setSubModal(false)
  }
  // --- Open create invoice modal ---
  const handleInvFormModalOpen = () => {
    setInvFormModal(true)
  }
  // --- Close create invoice modal ---
  const handleInvFormModalClose = () => {
    setInvFormModal(false)
  }
  // --- Open create subscription modal ---
  const handleSubFormModalOpen = () => {
    setSubFormModal(true)
  }
  // --- Close create subscription modal ---
  const handleSubFormModalClose = () => {
    setSubFormModal(false)
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
      if (client.data.name.toLowerCase().includes(searchTerm.toLowerCase()))
        filteredClients.push(client)
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

    // --- Display any error in snackbar and unset loading ui ---
    if (response && response.error && response.error !== "unauthorized") {
      console.log(response.error)
      setApiErrorMessage(response.error)
      handleErrorApiOpen()
      setLoading(false)
    }

    // --- Unset loading ui ---
    setLoading(false)
  }
  // -------------------- Search Methods Start --------------------

  // -------------------- Fauna API Start --------------------

  // --- Get clients from Fauna ---
  const getClients = useCallback(async () => {
    // --- Set loading ui ---
    setLoading(true)

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
      return false
    }

    // ---If connected to Fauna and got response, display success snackbar ---
    if (response && response.message) {
      console.log(response.message)
      setApiSuccessMessage(response.message)
      handleSuccessApiOpen()
    }

    // --- If in customers page, set state clients to customers ---
    if (
      filter === "customers" &&
      response &&
      response.message &&
      response.result.length > 0
    ) {
      setClients(response.result.filter(client => client.data.customer))
    }

    // --- If in leads page, set state clients to leads ---
    if (
      filter === "leads" &&
      response &&
      response.message &&
      response.result.length > 0
    ) {
      setClients(response.result.filter(client => !client.data.customer))
    }

    // --- Display any error in snackbar ---
    if (response && response.error && response.error !== "unauthorized") {
      console.log(response.error)
      setApiErrorMessage(response.error)
      handleErrorApiOpen()
    }

    // --- Unset loading ui ---
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, localHostError, liveError, setApiSuccessMessage])

  // --- Convert client in Fauna from leads/customers
  const handleConvert = async () => {
    // --- Set loading ui ---
    setLoading(true)

    if (filter === "customers") {
      // --- Update client in Fauna
      const response = await faunaApi.updateClient(
        targetClient.ref["@ref"].id,
        {
          ...targetClient.data,
          customer: false,
        }
      )

      // --- If got response, display success snackbar ---
      if (response && response.message) {
        console.log(response.message)
        setApiSuccessMessage(response.message)
        handleSuccessApiOpen()

        // --- Replace state client data with updated data ---
        const filteredClients = clients.filter(
          item => item.ts !== targetClient.ts
        )
        setClients(filteredClients)
      }

      // --- Display any error in snackbar ---
      if (response && response.error) {
        console.log(response.error)
        setApiErrorMessage(response.error)
        handleErrorApiOpen()
      }

      // --- Unset loading ui ---
      setLoading(false)
    }

    // --- Same logic as above for leads ---
    if (filter === "leads") {
      const response = await faunaApi.updateClient(
        targetClient.ref["@ref"].id,
        {
          ...targetClient.data,
          customer: true,
        }
      )
      if (response && response.message) {
        console.log(response.message)
        setApiSuccessMessage(response.message)
        handleSuccessApiOpen()

        const filteredClients = clients.filter(
          item => item.ts !== targetClient.ts
        )
        setClients(filteredClients)
      }
      if (response && response.error) {
        console.log(response.error)
        setApiErrorMessage(response.error)
        handleErrorApiOpen()
      }

      setLoading(false)
    }
  }

  // --- Delete client in Fauna ---
  const handleClientDelete = async () => {
    // --- Set loading ui ---
    setLoading(true)

    // --- Delete client in Fauna
    const res1 = await faunaApi.deleteClient(targetClient.ref["@ref"].id)

    // --- If got response, and client is a customer, display success snackbar ---
    if (res1 && res1.message && targetClient.data.customer) {
      console.log(res1.message)
      setApiSuccessMessage(res1.message)
      handleSuccessApiOpen()

      // --- Get all appointments from Fauna ---
      const ret = await faunaApi.readAllAppts()

      // --- If got response, display success snackbar ---
      if (ret && ret.message) {
        console.log(ret.message)
        setApiSuccessMessage(ret.message)
        handleSuccessApiOpen()
      }

      // --- Find matching appointment for the client in result ---
      if (ret && ret.result) {
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
      }

      // --- Display any error in snackbar and unset loading ui ---
      if (ret && ret.error) {
        console.log(ret.error)
        setApiErrorMessage(ret.error)
        handleErrorApiOpen()
      }

      // --- Delete client in Stripe ---
      const res2 = await stripeApi.deleteClient(targetClient.data.stripe_id)

      // --- If got response, display success snackbar ---
      if (res2 && res2.message) {
        console.log(res2.message)
        setApiSuccessMessage(res2.message)
        handleSuccessApiOpen()
      }

      // --- Display any error in snackbar and unset loading ui ---
      if (res2 && res2.error) {
        console.log(res2.error)
        setApiErrorMessage(res2.error)
        handleErrorApiOpen()
      }

      // --- Replace state client data with updated data ---
      const filteredClients = clients.filter(item => item.ts !== res1.result.ts)
      setClients(filteredClients)
    }

    // --- If result, and client is a lead, skip above logic and ---
    // -- only replace state client data with updated data ---
    if (res1 && res1.message && !targetClient.data.customer) {
      const filteredClients = clients.filter(item => item.ts !== res1.result.ts)
      setClients(filteredClients)
    }

    // --- Display any error in snackbar ---
    if (res1 && res1.error) {
      console.log(res1.error)
      setApiErrorMessage(res1.error)
      handleErrorApiOpen()
    }

    // --- Unset loading ui ---
    setLoading(false)
  }
  // -------------------- Fauna API End --------------------

  // -------------------- Stripe API Start --------------------

  // --- Get services from Stripe ---
  const getServices = useCallback(async () => {
    // --- Set loading ui ---
    setLoading(true)

    // --- Read all services from Stripe ---
    const result = await stripeApi.listServices()

    // --- If got response, display success snackbar ---
    if (result && result.message) {
      console.log(result.message)
      setApiSuccessMessage(result.message)
      handleSuccessApiOpen()

      // --- Set data for create invoices modal with result(services) ---
      setInvFormModalData(result.result.data)
    }

    // --- Display any error in snackbar ---
    if (result && result.error) {
      console.log(result.error)
      setApiErrorMessage(result.error)
      handleErrorApiOpen()
    }

    // --- Unset loading ui ---
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setApiSuccessMessage])

  // --- Get subscription plans from Stripe ---
  const getPlans = useCallback(async () => {
    // --- Set loading ui ---
    setLoading(true)

    // --- Read all plans from Stripe ---
    const result = await stripeApi.listPlans()

    // --- If got response, display success snackbar ---
    if (result && result.message) {
      console.log(result.message)
      setApiSuccessMessage(result.message)
      handleSuccessApiOpen()

      // --- Set data for create invoices modal with result(services) ---
      setSubFormModalData(result.result.data)
    }

    // --- Display any error in snackbar ---
    if (result && result.error) {
      console.log(result.error)
      setApiErrorMessage(result.error)
      handleErrorApiOpen()
    }

    // --- Unset loading ui ---
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setApiSuccessMessage])

  // --- Get invoices from Stripe ---
  const getInvoices = async id => {
    // --- Set loading ui ---
    setLoading(true)

    // --- Get all invoices from Stripe ---
    const result = await stripeApi.listInvoices(id)

    // --- If got response, display success snackbar ---
    if (result && result.message) {
      console.log(result.message)
      setApiSuccessMessage(result.message)
      handleSuccessApiOpen()

      // --- Set data for invoices list modal with result ---
      setInvoicesModalData(result.result)
    }

    // --- Display any error in snackbar ---
    if (result && result.error) {
      console.log(result.error)
      setApiErrorMessage(result.error)
      handleErrorApiOpen()
    }

    // --- Unset loading ui ---
    setLoading(false)
  }

  // --- Create invoice in Stripe ---
  const handleInvoiceCreate = async data => {
    // --- Set loading ui ---
    setLoading(true)

    // --- Create invoice items in Stripe ---
    const result = await stripeApi.createInvoiceItems(modalData.stripe_id, data)

    // --- If got response ---
    if (result && result.message) {
      // --- Display success snackbar ----
      console.log(result.message)
      setApiSuccessMessage(result.message)
      handleSuccessApiOpen()

      // --- Create invoice in Stripe ---
      const res = await stripeApi.createInvoice(modalData.stripe_id)

      // --- If got response, display success snackbar ----
      if (res && res.error) {
        console.log(res.message)
        setApiSuccessMessage(res.message)
        handleSuccessApiOpen()
      }

      // --- Display any error in snackbar ---
      if (res && res.error) {
        console.log(res.error)
        setApiErrorMessage(res.error)
        handleErrorApiOpen()
      }
    }

    // --- Display any error in snackbar ---
    if (result && result.error) {
      console.log(result.error)
      setApiErrorMessage(result.error)
      handleErrorApiOpen()
    }

    // --- Unset loading ui ---
    setLoading(false)
  }

  // --- Delete invoice in Stripe ---
  const handleInvoiceDelete = async id => {
    // --- Set loading ui ---
    setLoading(true)

    // --- Delete invoice in Stripe ---
    const result = await stripeApi.deleteInvoice(id)

    // --- If got response, display success snackbar ---
    if (result && result.message) {
      console.log(result.message)
      setApiSuccessMessage(result.message)
      handleSuccessApiOpen()

      // --- Replace state/modal invoice data with updated data ---
      const filteredData = invoicesModalData.filter(
        item => item.id !== result.result.id
      )
      setInvoicesModalData(filteredData)

      // --- Appointment api/logic ---
      // --- Get appointments from Fauna ---
      const response = await faunaApi.readAllAppts()

      // --- If got response, display success snackbar ---
      if (response && response.message) {
        console.log(response.message)
        setApiSuccessMessage(response.message)
        handleSuccessApiOpen()
      }

      // --- Find the appointment in result with deleted invoice and delete ---
      if (response && response.result) {
        response.result.forEach(async appt => {
          if (
            appt &&
            appt.data.invoice.hasOwnProperty("id") &&
            appt.data.invoice.id === result.result.id
          ) {
            const res = await faunaApi.updateAppt(appt.ref["@ref"].id, {
              invoice: {},
            })

            // --- If got response, display success snackbar ---
            if (res && res.message) {
              console.log(res.message)
              setApiSuccessMessage(res.message)
              handleSuccessApiOpen()
            }

            // --- Display any error in snackbar ---
            if (res && res.error) {
              console.log(res.error)
              setApiErrorMessage(res.error)
              handleErrorApiOpen()
            }
          }
        })
      }

      // --- Display any error in snackbar ---
      if (response && response.error) {
        console.log(response.error)
        setApiErrorMessage(response.error)
        handleErrorApiOpen()
      }

      // --- End appointment api/logic ---
    }

    // --- Display any error in snackbar ---
    if (result && result.error) {
      console.log(result.error)
      setApiErrorMessage(result.error)
      handleErrorApiOpen()
    }

    // --- Unset loading ui ---
    setLoading(false)
  }

  // --- Send invoice to customer via Stripe ---
  const handleSendInvoice = async id => {
    // --- Set loading ui ---
    setLoading(true)

    // --- Send invoice via Stripe ---
    const result = await stripeApi.sendInvoice(id)

    // --- If got response, display success snackbar ---
    if (result && result.message) {
      console.log(result.message)
      setApiSuccessMessage(result.message)
      handleSuccessApiOpen()

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
      if (response && response.message) {
        console.log(response.message)
        setApiSuccessMessage(response.message)
        handleSuccessApiOpen()
      }

      // --- Find the appointment in result with sent invoice and update ---
      if (response && response.result) {
        response.result.forEach(async appt => {
          if (
            appt &&
            appt.data.invoice.hasOwnProperty("id") &&
            appt.data.invoice.id === result.result.id
          ) {
            const res = await faunaApi.updateAppt(appt.ref["@ref"].id, {
              invoice: result.result,
            })

            // --- If got response, display success snackbar ---
            if (res && res.message) {
              console.log(res.message)
              setApiSuccessMessage(res.message)
              handleSuccessApiOpen()
            }

            // --- Display any error in snackbar ---
            if (res && res.error) {
              console.log(res.error)
              setApiErrorMessage(res.error)
              handleErrorApiOpen()
            }
          }
        })
      }

      // --- Display any error in snackbar ---
      if (response && response.error) {
        console.log(response.error)
        setApiErrorMessage(response.error)
        handleErrorApiOpen()
      }

      // --- End appointment api ---
    }

    // --- Display any error in snackbar ---
    if (result && result.error) {
      console.log(result.error)
      setApiErrorMessage(result.error)
      handleErrorApiOpen()
    }

    // --- Unset loading ui ---
    setLoading(false)
  }

  // --- Voice invoice in Stripe ---
  const handleVoidInvoice = async id => {
    // --- Set loading ui ---
    setLoading(true)

    // --- Voice invoice in Stripe ---
    const result = await stripeApi.voidInvoice(id)

    // --- If got response, display success snackbar ---
    if (result && result.message) {
      console.log(result.message)
      setApiSuccessMessage(result.message)
      handleSuccessApiOpen()

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
      if (response && response.message) {
        console.log(response.message)
        setApiSuccessMessage(response.message)
        handleSuccessApiOpen()
      }

      // --- Find the appointment in result with voided invoice and update ---
      if (response && response.result) {
        response.result.forEach(async appt => {
          if (
            appt &&
            appt.data.invoice.hasOwnProperty("id") &&
            appt.data.invoice.id === result.result.id
          ) {
            const res = await faunaApi.updateAppt(appt.ref["@ref"].id, {
              invoice: result.result,
            })
            // --- If got response, display success snackbar ---
            if (res && res.message) {
              console.log(res.message)
              setApiSuccessMessage(res.message)
              handleSuccessApiOpen()
            }

            // --- Display any error in snackbar ---
            if (res && res.error) {
              console.log(res.error)
              setApiErrorMessage(res.error)
              handleErrorApiOpen()
            }
          }
        })
      }

      // --- Display any error in snackbar ---
      if (response && response.error) {
        console.log(response.error)
        setApiErrorMessage(response.error)
        handleErrorApiOpen()
      }
      // --- End appointment api ---
    }

    // --- Display any error in snackbar ---
    if (result && result.error) {
      console.log(result.error)
      setApiErrorMessage(result.error)
      handleErrorApiOpen()
    }

    // --- Unset loading ui ---
    setLoading(false)
  }

  // --- Create subscription in Stripe ---
  const handleSubCreate = async data => {
    // --- remove nickname from value ---
    data.forEach(item => {
      delete item.nickname
    })

    // --- Set loading ui ---
    setLoading(true)

    // --- Create subscription in Stripe ---
    const result = await stripeApi.createSubscription(modalData.stripe_id, data)

    // --- If got response, display success snackbar ---
    if (result && result.message) {
      console.log(result.message)
      setApiSuccessMessage(result.message)
      handleSuccessApiOpen()
    }

    // --- Display any error in snackbar ---
    if (result && result.error) {
      console.log(result.error)
      setApiErrorMessage(result.error)
      handleErrorApiOpen()
    }

    // --- Unset loading ui ---
    setLoading(false)
  }

  // --- Get subscriptions from Stripe ---
  const getSubs = async id => {
    // --- Set loading ui ---
    setLoading(true)

    // --- Get all invoices from Stripe ---
    const result = await stripeApi.findSubscriptions(id)

    // --- If got response, display success snackbar ---
    if (result && result.message) {
      console.log(result.message)
      setApiSuccessMessage(result.message)
      handleSuccessApiOpen()

      // --- Set data for invoices list modal with result ---
      setSubModalData(result.result.data)
    }

    // --- Display any error in snackbar ---
    if (result && result.error) {
      console.log(result.error)
      setApiErrorMessage(result.error)
      handleErrorApiOpen()
    }

    // --- Unset loading ui ---
    setLoading(false)
  }

  // --- Cancel subscription in Stripe ---
  const handleSubDelete = async id => {
    // --- Set loading ui ---
    setLoading(true)

    // --- Delete subscription in Stripe ---
    const result = await stripeApi.deleteSubscription(id)

    // --- If got response, display success snackbar ---
    if (result && result.message) {
      console.log(result.message)
      setApiSuccessMessage(result.message)
      handleSuccessApiOpen()

      // --- Replace state/modal invoice data with updated data ---
      const filteredData = subModalData.filter(
        item => item.id !== result.result.id
      )
      setSubModalData(filteredData)
    }

    // --- Display any error in snackbar and unset loading ui ---
    if (result && result.error) {
      console.log(result.error)
      setApiErrorMessage(result.error)
      handleErrorApiOpen()
    }

    // --- Unset loading ui ---
    setLoading(false)
  }
  // -------------------- Stripe API End --------------------

  // -------------------- Twilio API Start --------------------
  // --- Send appointment reminder in Twilio ---
  const handleApptReminder = async data => {
    // --- Set loading ui ---
    setLoading(true)

    // --- Delete subscription in Stripe ---
    const result = await twilioApi.sendInvoice(data)

    // --- If got response, display success snackbar ---
    if (result && result.message) {
      console.log(result.message)
      setApiSuccessMessage(result.message)
      handleSuccessApiOpen()
    }

    // --- Display any error in snackbar ---
    if (result && result.error) {
      console.log(result.error)
      setApiErrorMessage(result.error)
      handleErrorApiOpen()
    }

    // --- Unset loading ui ---
    setLoading(false)
  }

  // --- Send invoice payment reminder in Twilio ---
  const handleInvReminder = async data => {
    // --- Set loading ui ---
    setLoading(true)

    // --- Delete subscription in Stripe ---
    const result = await twilioApi.sendInvoice({
      to: modalData.phone,
      body: `Hi ${modalData.name}, this is a friendly remindar to please pay your invoice: ${data}`,
    })

    // --- If got response, display success snackbar ---
    if (result && result.message) {
      console.log(result.message)
      setApiSuccessMessage(result.message)
      handleSuccessApiOpen()
    }

    // --- Display any error in snackbar ---
    if (result && result.error) {
      console.log(result.error)
      setApiErrorMessage(result.error)
      handleErrorApiOpen()
    }

    // --- Unset loading ui ---
    setLoading(false)
  }
  // -------------------- Twilio API End --------------------

  // -------------------- Start component logic --------------------
  useEffect(() => {
    // --- Get clients from Fauna ---
    getClients()
    // ---Get services from Stripe---
    getServices()
    // ---Get subscription plans from Stripe---
    getPlans()
  }, [getClients, getServices, getPlans])

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
              formInvModalData={formInvModalData}
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
              <div className={classes.flexResponsiveSmall}>
                <div>
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
                </div>
                <a
                  href="https://dashboard.stripe.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaCcStripe className={classes.iconFa} />
                </a>
              </div>
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
                getSubs={getSubs}
                setInvoiceName={setInvoiceName}
                invoicesModalOpen={handleInvoicesModalOpen}
                subModalOpen={handleSubModalOpen}
                handleInvFormModalOpen={handleInvFormModalOpen}
                handleSubFormModalOpen={handleSubFormModalOpen}
                localHostError={localHostError}
                liveError={liveError}
                setLoading={setLoading}
                handleSuccessApiOpen={handleSuccessApiOpen}
                setApiSuccessMessage={setApiSuccessMessage}
                handleErrorApiOpen={handleErrorApiOpen}
                setApiErrorMessage={setApiErrorMessage}
                handleApptReminder={handleApptReminder}
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
                handleInvReminder={handleInvReminder}
              />
              <CreateInvoiceModal
                open={formInvModal}
                onClose={handleInvFormModalClose}
                header={invoiceHeader}
                handleCreate={handleInvoiceCreate}
                data={formInvModalData}
              />
              <CreateSubModal
                open={formSubModal}
                onClose={handleSubFormModalClose}
                header={subscriptionHeader}
                handleCreate={handleSubCreate}
                data={formSubModalData}
              />
              <SubModal
                open={subModal}
                onClose={handleSubModalClose}
                header={`${invoiceName} subscriptions`}
                data={subModalData}
                handleDelete={handleSubDelete}
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
  subscriptionHeader: PropTypes.string.isRequired,
  localHostError: PropTypes.string.isRequired,
  liveError: PropTypes.string.isRequired,
}

export default Dashboard
