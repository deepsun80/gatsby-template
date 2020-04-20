const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_BOT_NUMBER } = process.env

const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

exports.handler = (event, context, callback) => {
  const requestBody = JSON.parse(event.body)

  return client.messages
    .create({
      from: TWILIO_BOT_NUMBER,
      to: requestBody.number,
      body: requestBody.message,
    })
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "Twilio message created",
          result,
        }),
      }
      callback(null, response)
    })
    .catch(error => {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          error: error.message,
        }),
      }
      callback(null, response)
    })
}
