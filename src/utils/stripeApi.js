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
  return fetch(`/.netlify/functions/stripe-customer-update/${clientId}`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const deleteClient = clientId => {
  return fetch(`/.netlify/functions/stripe-customer-delete/${clientId}`, {
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const listInvoices = clientId => {
  return fetch(`/.netlify/functions/stripe-invoice-list/${clientId}`).then(
    response => {
      return response.json()
    }
  )
}

const createInvoice = (clientId, data) => {
  return fetch(`/.netlify/functions/stripe-invoice-create/${clientId}`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const deleteInvoice = invoiceId => {
  return fetch(`/.netlify/functions/stripe-invoice-delete/${invoiceId}`, {
    method: "DELETE",
  }).then(response => {
    return response.json()
  })
}

const sendInvoice = invoiceId => {
  return fetch(`/.netlify/functions/stripe-invoice-send/${invoiceId}`, {
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const voidInvoice = invoiceId => {
  return fetch(`/.netlify/functions/stripe-invoice-void/${invoiceId}`, {
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const findInvoice = invoiceId => {
  return fetch(`/.netlify/functions/stripe-invoice-search/${invoiceId}`).then(
    response => {
      return response.json()
    }
  )
}

const listServices = () => {
  return fetch("/.netlify/functions/stripe-sku-list/").then(response => {
    return response.json()
  })
}

const listPlans = () => {
  return fetch("/.netlify/functions/stripe-plan-list/").then(response => {
    return response.json()
  })
}

const createSubscription = (clientId, data) => {
  return fetch(`/.netlify/functions/stripe-subscription-create/${clientId}`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

const findSubscriptions = clientId => {
  return fetch(`/.netlify/functions/stripe-subscription-list/${clientId}`).then(
    response => {
      return response.json()
    }
  )
}

const deleteSubscription = subId => {
  return fetch(`/.netlify/functions/stripe-subscription-delete/${subId}`, {
    method: "DELETE",
  }).then(response => {
    return response.json()
  })
}

export default {
  createClient: createClient,
  updateClient: updateClient,
  deleteClient: deleteClient,
  listInvoices: listInvoices,
  createInvoice: createInvoice,
  deleteInvoice: deleteInvoice,
  sendInvoice: sendInvoice,
  voidInvoice: voidInvoice,
  findInvoice: findInvoice,
  listServices: listServices,
  listPlans: listPlans,
  createSubscription: createSubscription,
  findSubscriptions: findSubscriptions,
  deleteSubscription: deleteSubscription,
}
