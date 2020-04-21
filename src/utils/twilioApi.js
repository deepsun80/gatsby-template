/* Api methods to call /functions */

const sendInvoice = data => {
  return fetch("/.netlify/functions/twilio-sms-send", {
    body: JSON.stringify(data),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

export default {
  sendInvoice: sendInvoice,
}
