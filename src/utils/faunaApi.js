/* Api methods to call /functions */

const create = data => {
  return fetch("/.netlify/functions/fauna-customer-create", {
    body: JSON.stringify(data),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const readAll = () => {
  return fetch("/.netlify/functions/fauna-customer-read-all").then(response => {
    return response.json()
  })
}

const search = data => {
  return fetch("/.netlify/functions/fauna-customer-search", {
    body: JSON.stringify(data),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}
const update = (clientId, data) => {
  return fetch(`/.netlify/functions/fauna-customer-update/${clientId}`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const deleteclient = clientId => {
  return fetch(`/.netlify/functions/fauna-customer-delete/${clientId}`, {
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const batchDeleteclient = clientIds => {
  return fetch(`/.netlify/functions/fauna-customer-delete-batch`, {
    body: JSON.stringify({
      ids: clientIds,
    }),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

export default {
  create: create,
  readAll: readAll,
  search: search,
  update: update,
  delete: deleteclient,
  batchDelete: batchDeleteclient,
}
