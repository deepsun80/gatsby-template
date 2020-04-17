import React, { useState, useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import Tooltip from "@material-ui/core/Tooltip"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import ReplayIcon from "@material-ui/icons/Replay"
import ClearIcon from "@material-ui/icons/Clear"
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
  formInvModalData,
  invoiceHeader,
  handleSuccessApiOpen,
  handleErrorApiOpen,
  setApiSuccessMessage,
  setApiErrorMessage,
}) => {
  const classes = useStyles()

  const [searchTerm, setSearchTerm] = useState("")
  const [appts, setAppts] = useState([])
  const [filteredAppts, setFilteredAppts] = useState([])
  const [filter, setFilter] = React.useState("all")
  const [formInvModal, setInvFormModal] = useState(false)
  const [clientData, setClientData] = useState({})
  const [apptData, setApptData] = useState({})

  // -------------------- Modals methods start --------------------
  // --- Open create invoice modal ---
  const handleInvFormModalOpen = async data => {
    // --- Set input as state/modal appointment data ---
    setApptData(data)
    // --- Open create invoice modal ---
    setInvFormModal(true)
    // --- Get client data from Fauna ---
    const response = await faunaApi.searchClients(
      data.data.payload.invitee.email
    )
    // --- If got response, display success snackbar ---
    if (response.message) {
      console.log(response.message)
      setApiSuccessMessage(response.message)
      handleSuccessApiOpen()
    }
    // --- Set response as state/modal client data ---
    setClientData(response.result)
  }
  // --- Close create invoice modal ---
  const handleInvFormModalClose = () => {
    setInvFormModal(false)
  }
  // -------------------- Modals methods end --------------------

  // -------------------- Search & Filter Methods Start --------------------
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

    if (response && response.result.length > 0) {
      const sortedArray = response.result.sort(
        (a, b) =>
          moment(a.data.payload.event.start_time).format("YYYYMMDDHH") -
          moment(b.data.payload.event.start_time).format("YYYYMMDDHH")
      )
      setAppts(sortedArray)
    }

    setLoading(false)
  }
  // -------------------- Search & Filter Methods End --------------------

  // -------------------- Fauna API start --------------------
  // --- Get appointments from Fauna ---
  const getAppts = useCallback(async () => {
    // --- Set loading ui ---
    setLoading(true)

    // --- Get appointments from Fauna ---
    const response = await faunaApi.readAllAppts()

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

    // --- Once response array is loaded ---
    if (response && response.result.length > 0) {
      // --- For each appointment, get its invoice via id ---
      response.result.forEach(async appt => {
        if (appt && appt.data.invoice.hasOwnProperty("id")) {
          try {
            // --- Search stripe for matching invoice id ---
            const ret = await stripeApi.findInvoice(appt.data.invoice.id)

            // --- If no invoice found, set state invoice in appointment to void ---
            if (ret && ret.hasOwnProperty("error")) {
              appt.data.invoice = { status: "void" }
              console.log(ret.error)
            }

            // --- If invoice found update the invoice field in that appointment in Fauna ---
            if (ret && ret.hasOwnProperty("message")) {
              const res = await faunaApi.updateAppt(appt.ref["@ref"].id, {
                invoice: ret.result,
              })

              //-- Update the state invoice in appointment ---
              appt.data.invoice = ret.result

              // --- If response, display success snackbar ---
              if (res && res.message) {
                console.log(res.message)
                setApiSuccessMessage(res.message)
                handleSuccessApiOpen()
              }

              // --- Display any error in snackbar and unset loading ui ---
              if (res && res.error) {
                console.log(res.error)
                setApiErrorMessage(res.error)
                handleErrorApiOpen()
                setLoading(false)
              }
            }

            // --- Within forEach, sort appointments to display newest date first ---
            const sortedArray = response.result.sort(
              (a, b) =>
                moment(a.data.payload.event.start_time).format("YYYYMMDDHH") -
                moment(b.data.payload.event.start_time).format("YYYYMMDDHH")
            )
            setAppts(sortedArray)
          } catch (err) {
            // --- If no matching invoice found, set appointment invoice in Fauna to empty ---
            await faunaApi.updateAppt(appt.ref["@ref"].id, {
              invoice: {},
            })

            // --- Display any error in snackbar ---
            console.log(
              "No matching invoice found in appointment:",
              err.message
            )
            setApiErrorMessage(
              "No matching invoice found in appointment:",
              err.message
            )
            handleErrorApiOpen()
          }
        }
      })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localHostError, liveError, setLoading, setApiSuccessMessage])
  // -------------------- Fauna appintments API end --------------------

  // -------------------- Stripe API Start-----------------------
  // --- Create invoice in Stripe ---
  const handleInvoiceCreate = async data => {
    // --- Set loading ui ---
    setLoading(true)

    // --- Create invoice in Stripe ---
    const result = await stripeApi.createInvoice(
      clientData.data.stripe_id,
      data
    )

    if (result && result.message) {
      // --- If got response, display success snackbar ---
      console.log(result.message)
      setApiSuccessMessage(result.message)
      handleSuccessApiOpen()

      // --- Update appointment in Fauna with created invoice ---
      const res = await faunaApi.updateAppt(apptData.ref["@ref"].id, {
        invoice: result.result,
      })

      if (res && res.message) {
        // --- If got response, display success snackbar ---
        console.log(res.message)
        setApiSuccessMessage(res.message)
        handleSuccessApiOpen()

        // --- Reset all appointments ---
        const response = await faunaApi.readAllAppts()

        // --- Sort appointments to display newest date first ---
        if (response && response.result.length > 0) {
          const sortedArray = response.result.sort(
            (a, b) =>
              moment(a.data.payload.event.start_time).format("YYYYMMDDHH") -
              moment(b.data.payload.event.start_time).format("YYYYMMDDHH")
          )
          setAppts(sortedArray)
        }
      }

      // --- Display any error in snackbar and unset loading ui ---
      if (res && res.error) {
        console.log(res.error)
        setApiErrorMessage(res.error)
        handleErrorApiOpen()
        setLoading(false)
      }
    }

    // --- Display any error in snackbar and unset loading ui ---
    if (result && result.error) {
      console.log(result.error)
      setApiErrorMessage(result.error)
      handleErrorApiOpen()
      setLoading(false)
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

      // --- Start Appointments API logic ---
      // --- Get appointments from Fauna ---
      const response = await faunaApi.readAllAppts()

      // --- If got response, display success snackbar ---
      if (response.message) {
        console.log(response.message)
        setApiSuccessMessage(response.message)
        handleSuccessApiOpen()
      }

      // --- Find the appointment with that invoice in Fauna and update ---
      if (response && response.result.length > 0) {
        response.result.forEach(async appt => {
          // --- if no invoice found, set state appointment invoice to void ---
          if (
            appt &&
            appt.data.invoice.hasOwnProperty("id") &&
            result.hasOwnProperty("error")
          ) {
            appt.data.invoice = { status: "void" }

            // --- Sort the result to newest first ---
            const sortedArray = response.result.sort(
              (a, b) =>
                moment(a.data.payload.event.start_time).format("YYYYMMDDHH") -
                moment(b.data.payload.event.start_time).format("YYYYMMDDHH")
            )
            setAppts(sortedArray)
          }

          // --- If matching invoice found in Fauna update it ---
          if (
            appt &&
            appt.data.invoice.hasOwnProperty("id") &&
            result &&
            result.hasOwnProperty("message") &&
            appt.data.invoice.id === result.result.id
          ) {
            // --- if appointment found update it with new invoice ---
            const res = await faunaApi.updateAppt(appt.ref["@ref"].id, {
              invoice: result.result,
            })

            // --- If got response, display success snackbar ---
            if (res.message) {
              console.log(res.message)
              setApiSuccessMessage(res.message)
              handleSuccessApiOpen()
            }

            // --- Update the state appointment ---
            appt.data.invoice = JSON.parse(JSON.stringify(result.result))

            // --- Sort the result to newest first ---
            const sortedArray = response.result.sort(
              (a, b) =>
                moment(a.data.payload.event.start_time).format("YYYYMMDDHH") -
                moment(b.data.payload.event.start_time).format("YYYYMMDDHH")
            )
            setAppts(sortedArray)
          }
        })
        // --- End appointment API logic ---
      }

      // --- Display any error in snackbar ---
      if (response && response.error) {
        console.log(response.error)
        setApiErrorMessage(response.error)
        handleErrorApiOpen()
      }
    }

    // --- Display any error in snackbar ---
    if (result && result.error) {
      console.log(result.error)
      setApiErrorMessage(result.error)
      handleErrorApiOpen()
      setLoading(false)
    }

    // --- Unset loading ui ---
    setLoading(false)
  }
  // -------------------- Stripe API End --------------------

  // -------------------- Start component logic --------------------
  useEffect(() => {
    // --- Get appointments from Fauna ---
    getAppts()
  }, [getAppts])

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
          <Tooltip title="Reset all appointments" arrow>
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
        {/* --- Search bar end --- */}

        {/* --- Filter ui start --- */}
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
      {/* --- Filter ui end --- */}

      {/* --- Appointments list start --- */}
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
                <TableCell className={classes.tableHeader}>
                  Invoice Status
                </TableCell>
                <TableCell className={classes.tableHeader}>
                  Invoice Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAppts.map(row => (
                // --- If row is before current date lightlight it ---
                <TableRow
                  key={row.ref["@ref"].id}
                  hover
                  selected={moment(
                    row.data.payload.event.start_time
                  ).isBefore()}
                >
                  {/* --- Appointment name --- */}
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
                  {/* --- Appointment start time --- */}
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
                  {/* --- Appointment end time --- */}
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
                  {/* --- Appointment client name --- */}
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
                  {/* --- Appointment invoice status --- */}
                  <TableCell
                    style={
                      row &&
                      row.data.invoice.hasOwnProperty("status") &&
                      row.data.invoice.status === "draft"
                        ? { color: "cornflowerblue" }
                        : row.data.invoice.status === "paid"
                        ? { color: "green" }
                        : row.data.invoice.status === "open"
                        ? { color: "dodgerblue" }
                        : { color: "red" }
                    }
                  >
                    {row && row.data.invoice.hasOwnProperty("status")
                      ? row.data.invoice.status
                      : "not created"}
                  </TableCell>
                  {/* --- Appointment invoice action --- */}
                  <TableCell>
                    {row &&
                    row.data.invoice.hasOwnProperty("status") &&
                    row.data.invoice.status === "void" ? (
                      <ClearIcon style={{ color: "red" }} />
                    ) : row.data.invoice.status === "open" ? (
                      <DoneIcon style={{ color: "green" }} />
                    ) : row.data.invoice.hasOwnProperty("status") &&
                      row.data.invoice.status === "draft" ? (
                      <Tooltip title="Send invoice" arrow>
                        <ExitToAppIcon
                          className={classes.icon}
                          onClick={() => {
                            handleSendInvoice(row.data.invoice.id)
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Create invoice" arrow>
                        <AddBoxIcon
                          className={classes.icon}
                          onClick={() => {
                            handleInvFormModalOpen(row)
                          }}
                        />
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* --- Modals start --- */}
      <CreateInvoiceModal
        open={formInvModal}
        onClose={handleInvFormModalClose}
        header={invoiceHeader}
        handleCreate={handleInvoiceCreate}
        data={formInvModalData}
      />
      {/* --- Modals end --- */}
    </>
  )
}

Appt.propTypes = {
  localHostError: PropTypes.string.isRequired,
  liveError: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
  formInvModalData: PropTypes.array.isRequired,
  invoiceHeader: PropTypes.string.isRequired,
  handleSuccessApiOpen: PropTypes.func.isRequired,
  setApiSuccessMessage: PropTypes.func.isRequired,
  handleErrorApiOpen: PropTypes.func.isRequired,
  setApiErrorMessage: PropTypes.func.isRequired,
}

export default Appt
