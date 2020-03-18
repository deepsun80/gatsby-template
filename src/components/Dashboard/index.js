import React, { useState } from "react"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import Modal from "./Modal"
import data from "./data"
import useStyles from "./style"

const Dashboard = () => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const [modalData, setModalData] = useState({})

  const handleClickOpen = data => {
    setOpen(true)
    console.log(data)
    setModalData(data)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <main className={classes.root}>
      <Container maxWidth="xl" className={classes.container}>
        <Paper elevation={1} className={classes.paper}>
          {data.map((client, index) => (
            <List aria-label="client list" key={index}>
              <ListItem button>
                <ListItemText
                  primary={
                    <Typography variant="body2" color="primary">
                      {client.name}
                    </Typography>
                  }
                  onClick={() => handleClickOpen(client)}
                />
                <ListItemIcon>
                  <DeleteForeverIcon
                    className={classes.icon}
                    onClick={() => alert("clicked")}
                  />
                </ListItemIcon>
              </ListItem>
            </List>
          ))}
        </Paper>
        <Modal open={open} onClose={handleClose} data={modalData} />
      </Container>
    </main>
  )
}

export default Dashboard
