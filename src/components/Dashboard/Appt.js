import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import ReplayIcon from "@material-ui/icons/Replay"
import DoneIcon from "@material-ui/icons/Done"
import AddBoxIcon from "@material-ui/icons/AddBox"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import { CreateInvoiceModal } from "./modals"
import faunaApi from "../../utils/faunaApi"
import stripeApi from "../../utils/stripeApi"
import isLocalHost from "../../utils/isLocalHost"
import moment from "moment"
import useStyles from "./style"
import { Typography } from "@material-ui/core"

const Appt = ({
  localHostError,
  liveError,
  setLoading,
  formModalData,
  invoiceHeader,
}) => {
  const classes = useStyles()

  const [searchTerm, setSearchTerm] = useState("")
  const [appts, setAppts] = useState([])
  const [filteredAppts, setFilteredAppts] = useState([])
  const [filter, setFilter] = React.useState("all")
  const [formModal, setFormModal] = useState(false)
  const [clientData, setClientData] = useState({})
  const [apptData, setApptData] = useState({})

  // --- Modals Start ---
  const handleFormModalOpen = async data => {
    setApptData(data)
    setFormModal(true)
    const response = await faunaApi.searchClients(
      data.data.payload.invitee.email
    )
    console.log("Client:", response)
    setClientData(response)
  }

  const handleFormModalClose = () => {
    setFormModal(false)
  }
  // --- Modals End ---

  // --- Search & Filter Methods Start ---
  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const handleChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    let searchedAppts = []

    if (filteredAppts.length > 0) {
      filteredAppts.forEach(appt => {
        if (
          appt.data.payload.invitee.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
          searchedAppts.push(appt)
      })
    }

    if (searchedAppts.length > 0) setFilteredAppts(searchedAppts)
  }

  const handleReset = async () => {
    setLoading(true)

    const response = await faunaApi.readAllAppts()

    if (response.message === "unauthorized") {
      if (isLocalHost()) {
        alert(localHostError)
      } else {
        alert(liveError)
      }
      setLoading(false)
      return false
    }

    const sortedArray = response.sort(
      (a, b) =>
        moment(a.data.payload.event.start_time).format("YYYYMMDDHH") -
        moment(b.data.payload.event.start_time).format("YYYYMMDDHH")
    )

    setAppts(sortedArray)
    setLoading(false)
  }
  // --- Search & Filter Methods End ---

  // --- Stripe API Start ---
  const handleInvoiceCreate = async data => {
    setLoading(true)
    try {
      // --- Create Invoice ---
      const result = await stripeApi.createInvoice(
        clientData.data.stripe_id,
        data
      )
      console.log("Stripe invoice created:", result)

      if (result.message === "Stripe invoice created") {
        try {
          // --- Update Appointment with invoice ---
          const res = await faunaApi.updateAppt(apptData.ref["@ref"].id, {
            invoice: result.result,
          })
          console.log("Invoice added to appointment:", res)

          // --- Reset all appointments ---
          const response = await faunaApi.readAllAppts()

          const sortedArray = response.sort(
            (a, b) =>
              moment(a.data.payload.event.start_time).format("YYYYMMDDHH") -
              moment(b.data.payload.event.start_time).format("YYYYMMDDHH")
          )

          setAppts(sortedArray)
        } catch (err) {
          alert("There was an error adding invoice to appointment", err)
          setLoading(false)
        }
      }
      setLoading(false)
    } catch (error) {
      alert("There was an error creating the invoice", error)
      setLoading(false)
    }
  }

  // const handleSendInvoice = async id => {
  //   console.log(id)
  //   // setLoading(true)
  //   // try {
  //   //   // --send invoice
  //   //   const result = await stripeApi.sendInvoice(id)
  //   //   console.log("Stripe invoice sent:", result)

  //   //   // --update appointment with result as invoice

  //   //   // -- reset/get all appintments again
  //   //   setLoading(false)
  //   // } catch (err) {
  //   //   alert("There was an error sending invoice", err)
  //   //   setLoading(false)
  //   // }
  // }
  // --- Stripe API End ---

  useEffect(() => {
    // --- Get appointments from Faunda ---
    const getAppts = async () => {
      setLoading(true)

      const response = await faunaApi.readAllAppts()

      if (response.message === "unauthorized") {
        if (isLocalHost()) {
          alert(localHostError)
        } else {
          alert(liveError)
        }
        setLoading(false)
        return false
      }

      const sortedArray = response.sort(
        (a, b) =>
          moment(a.data.payload.event.start_time).format("YYYYMMDDHH") -
          moment(b.data.payload.event.start_time).format("YYYYMMDDHH")
      )

      setAppts(sortedArray)
      setLoading(false)
    }

    getAppts()
  }, [localHostError, liveError, setLoading])

  useEffect(() => {
    // --- Filter Logic ---
    if (appts.length > 0 && filter === "all") setFilteredAppts(appts)
    if (appts.length > 0 && filter === "upcoming") {
      setFilteredAppts(
        appts.filter(appt =>
          moment(appt.data.payload.event.start_time).isAfter()
        )
      )
    }
    if (appts.length > 0 && filter === "past") {
      setFilteredAppts(
        appts.filter(appt =>
          moment(appt.data.payload.event.start_time).isBefore()
        )
      )
    }
  }, [filter, appts])

  return (
    <>
      <div className={classes.flexResponsive}>
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

          <IconButton
            color="secondary"
            aria-label="reset"
            component="span"
            onClick={handleReset}
          >
            <ReplayIcon />
          </IconButton>
        </div>

        <div>
          <FormControl variant="outlined" className={classes.searchField}>
            <Select
              id="filter"
              value={filter}
              onChange={handleFilterChange}
              className={classes.selectField}
            >
              <MenuItem value="all">
                <em>View All</em>
              </MenuItem>
              <MenuItem value={"upcoming"}>Upcoming</MenuItem>
              <MenuItem value={"past"}>Past</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <Paper elevation={1} className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeader}>Service</TableCell>
                <TableCell className={classes.tableHeader}>
                  Start Time
                </TableCell>
                <TableCell className={classes.tableHeader}>End Time</TableCell>
                <TableCell className={classes.tableHeader}>Customer</TableCell>
                <TableCell className={classes.tableHeader}>Invoice</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAppts.map(row => (
                <TableRow
                  key={row.ref["@ref"].id}
                  hover
                  selected={moment(
                    row.data.payload.event.start_time
                  ).isBefore()}
                >
                  <TableCell>
                    <Typography
                      variant="body2"
                      style={
                        moment(row.data.payload.event.start_time).isBefore()
                          ? { opacity: 0.4 }
                          : null
                      }
                    >
                      {row.data.payload.event_type.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      style={
                        moment(row.data.payload.event.start_time).isBefore()
                          ? { opacity: 0.4 }
                          : null
                      }
                    >
                      {row.data.payload.event.start_time_pretty}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      style={
                        moment(row.data.payload.event.start_time).isBefore()
                          ? { opacity: 0.4 }
                          : null
                      }
                    >
                      {row.data.payload.event.end_time_pretty}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      style={
                        moment(row.data.payload.event.start_time).isBefore()
                          ? { opacity: 0.4 }
                          : null
                      }
                    >
                      {row.data.payload.invitee.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {row.data.invoice.hasOwnProperty("status") &&
                    row.data.invoice.status === "open" ? (
                      <DoneIcon style={{ color: "green" }} />
                    ) : row.data.invoice.hasOwnProperty("status") &&
                      row.data.invoice.status === "draft" ? (
                      <ExitToAppIcon
                        className={classes.icon}
                        onClick={() => {
                          // handleFormModalOpen(row)
                        }}
                      />
                    ) : (
                      <AddBoxIcon
                        className={classes.icon}
                        onClick={() => {
                          handleFormModalOpen(row)
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <CreateInvoiceModal
        open={formModal}
        onClose={handleFormModalClose}
        header={invoiceHeader}
        handleCreate={handleInvoiceCreate}
        data={formModalData}
      />
    </>
  )
}

Appt.propTypes = {
  localHostError: PropTypes.string.isRequired,
  liveError: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  formModalData: PropTypes.array.isRequired,
  invoiceHeader: PropTypes.string.isRequired,
}

export default Appt
