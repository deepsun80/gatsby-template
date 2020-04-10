/* Api methods to call /functions */

/* ---Clients--- */
const createClient = data => {
  return fetch("/.netlify/functions/fauna-customer-create", {
    body: JSON.stringify(data),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const readAllClients = () => {
  return fetch("/.netlify/functions/fauna-customer-read-all").then(response => {
    return response.json()
  })
}

const searchClients = data => {
  return fetch("/.netlify/functions/fauna-customer-search", {
    body: JSON.stringify(data),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const updateClient = (clientId, data) => {
  return fetch(`/.netlify/functions/fauna-customer-update/${clientId}`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const deleteClient = clientId => {
  return fetch(`/.netlify/functions/fauna-customer-delete/${clientId}`, {
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const batchDeleteClient = clientIds => {
  return fetch(`/.netlify/functions/fauna-customer-delete-batch`, {
    body: JSON.stringify({
      ids: clientIds,
    }),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

/* ---Appointments--- */
const readAllAppts = () => {
  return fetch("/.netlify/functions/fauna-appt-read-all").then(response => {
    return response.json()
  })
}

const searchAppts = data => {
  return fetch("/.netlify/functions/fauna-appt-search", {
    body: JSON.stringify(data),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const updateAppt = (apptId, data) => {
  return fetch(`/.netlify/functions/fauna-appt-update/${apptId}`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const deleteAppt = apptId => {
  return fetch(`/.netlify/functions/fauna-appt-delete/${apptId}`, {
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

export default {
  createClient: createClient,
  readAllClients: readAllClients,
  searchClients: searchClients,
  updateClient: updateClient,
  deleteClient: deleteClient,
  batchDeleteClient: batchDeleteClient,
  readAllAppts: readAllAppts,
  searchAppts: searchAppts,
  updateAppt: updateAppt,
  deleteAppt: deleteAppt,
}
