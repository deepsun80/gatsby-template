/* Api methods to call /functions */

const create = data => {
  return fetch("/.netlify/functions/fauna-create", {
    body: JSON.stringify(data),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const readAll = () => {
  return fetch("/.netlify/functions/fauna-read-all").then(response => {
    return response.json()
  })
}

const update = (clientId, data) => {
  return fetch(`/.netlify/functions/fauna-update/${clientId}`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const deleteclient = clientId => {
  return fetch(`/.netlify/functions/fauna-delete/${clientId}`, {
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const batchDeleteclient = clientIds => {
  return fetch(`/.netlify/functions/fauna-delete-batch`, {
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
  update: update,
  delete: deleteclient,
  batchDelete: batchDeleteclient,
}
