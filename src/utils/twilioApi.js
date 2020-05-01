/* Api methods to call /functions */

const sendSms = data => {
  return fetch("/.netlify/functions/twilio-sms-send", {
    body: JSON.stringify(data),
    method: "POST",
  }).then(response => {
    return response.json()
  })
}

export default {
  sendSms: sendSms,
}
