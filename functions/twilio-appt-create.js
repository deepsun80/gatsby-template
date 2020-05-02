const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_BOT_NUMBER } = process.env

const twilioClient = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body)

  return twilioClient.messages
    .create({
      from: TWILIO_BOT_NUMBER,
      to: data.payload.questions_and_responses["1_response"],
      body: `Hi ${data.payload.invitee.name}, your appointment is set for ${data.payload.event.start_time_pretty}`,
    })
    .then(result => {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Twilio sms sent",
          result,
        }),
      }
    })
    .catch(err => {
      return {
        statusCode: 500,
        body: JSON.stringify(`Twilio error: ${err.message}`),
      }
    })
}
