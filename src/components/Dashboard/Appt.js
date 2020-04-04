import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import ReplayIcon from "@material-ui/icons/Replay"
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
// import {
//   InvoicesModal,
// } from "./modals"
import faunaApi from "../../utils/faunaApi"
import isLocalHost from "../../utils/isLocalHost"
import moment from "moment"
import useStyles from "./style"

const Appt = ({ localHostError, liveError, setLoading }) => {
  const classes = useStyles()

  const [searchTerm, setSearchTerm] = useState("")
  const [appts, setAppts] = useState([])
  const [filteredAppts, setFilteredAppts] = useState([])
  const [filter, setFilter] = React.useState("all")

  const handleChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    // let filteredClients = []

    // clients.forEach(client => {
    //   if (client.data.name.includes(searchTerm)) filteredClients.push(client)
    // })
    // if (filteredClients.length > 0) setClients(filteredClients)
    console.log(searchTerm)
  }

  const handleReset = async () => {
    // setLoading(true)
    // const response = await faunaApi.readAllClients()
    // if (response.message === "unauthorized") {
    //   if (isLocalHost()) {
    //     alert(localHostError)
    //   } else {
    //     alert(liveError)
    //   }
    //   setLoading(false)
    //   return false
    // }
    // if (filter === "customers") {
    //   setLoading(false)
    //   setClients(response.filter(client => client.data.customer))
    // }
    // if (filter === "leads") {
    //   setLoading(false)
    //   setClients(response.filter(client => !client.data.customer))
    // }
  }

  useEffect(() => {
    // ---Get clients from Faunda---
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
          moment(a.data.payload.event.start_time).format("YYYYMMDD") -
          moment(b.data.payload.event.start_time).format("YYYYMMDD")
      )

      setAppts(sortedArray)
      setLoading(false)
    }

    getAppts()
  }, [localHostError, liveError, setLoading])

  useEffect(() => {
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
                <TableRow key={row.ref["@ref"].id} hover>
                  <TableCell className={classes.tableBody}>
                    {row.data.payload.event_type.name}
                  </TableCell>
                  <TableCell className={classes.tableBody}>
                    {row.data.payload.event.start_time_pretty}
                  </TableCell>
                  <TableCell className={classes.tableBody}>
                    {row.data.payload.event.end_time_pretty}
                  </TableCell>
                  <TableCell className={classes.tableBody}>
                    {row.data.payload.invitee.name}
                  </TableCell>
                  <TableCell>
                    <ExitToAppIcon
                      className={classes.icon}
                      // onClick={() => {
                      //   sendInvoice(row.id)
                      // }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}

Appt.propTypes = {
  localHostError: PropTypes.string.isRequired,
  liveError: PropTypes.string.isRequired,
  setLoading: PropTypes.func.isRequired,
}

export default Appt
