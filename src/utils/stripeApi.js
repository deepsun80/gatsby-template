/* Api methods to call /functions */

const createClient = data => {
  return fetch("/.netlify/functions/stripe-customer-create", {
    body: JSON.stringify(data),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const updateClient = (clientId, data) => {
  console.log(JSON.stringify(data))

  return fetch(`/.netlify/functions/stripe-customer-update/${clientId}`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const deleteClient = clientId => {
  console.log(clientId)
  return fetch(`/.netlify/functions/stripe-customer-delete/${clientId}`, {
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

// const readAll = () => {
//   return fetch("/.netlify/functions/fauna-read-all").then(response => {
//     return response.json()
//   })
// }

// const search = data => {
//   return fetch("/.netlify/functions/fauna-search", {
//     body: JSON.stringify(data),
//     method: "POST",
//   }).then(response => {
//     return response.json()
//   })
// }

// const batchDeleteclient = clientIds => {
//   return fetch(`/.netlify/functions/fauna-delete-batch`, {
//     body: JSON.stringify({
//       ids: clientIds,
//     }),
//     method: "POST",
//   }).then(response => {
//     return response.json()
//   })
// }

export default {
  createClient: createClient,
  updateClient: updateClient,
  deleteClient: deleteClient,
}
