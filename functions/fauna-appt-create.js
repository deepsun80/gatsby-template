const {
  FAUNADB_SERVER_SECRET,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_BOT_NUMBER,
} = process.env

const faunadb = require("faunadb")
const twilioClient = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

const q = faunadb.query
const faunaClient = new faunadb.Client({
  secret: FAUNADB_SERVER_SECRET,
})

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body)
  const apptItem = {
    data: { ...data, invoice: {} },
  }

  /* Customer Added New Event */
  if (data.event === "invitee.created") {
    return faunaClient
      .query(q.Create(q.Ref("classes/appointments"), apptItem))
      .then(response => {
        return twilioClient.messages
          .create({
            from: TWILIO_BOT_NUMBER,
            to: data.payload.questions_and_responses["2_response"],
            body: `Hi ${data.payload.invitee.name}, your appointment is set for ${data.payload.event.start_time_pretty}`,
          })
          .then(result => {
            const response = {
              statusCode: 200,
              body: JSON.stringify({
                message: "Appointment added and Twilio sms message sent",
                result,
              }),
            }
            callback(null, response)
          })
          .catch(err => {
            const response = {
              statusCode: 500,
              body: JSON.stringify({
                error: `Twilio error: ${error.message}`,
              }),
            }
            callback(null, response)
          })
      })
      .catch(error => {
        return {
          statusCode: 400,
          body: JSON.stringify(error),
        }
      })
  }

  /* Customer Cancelled Event */
  return faunaClient
    .query(q.Paginate(q.Match(q.Ref("indexes/all_appointments"))))
    .then(response => {
      const apptRefs = response.data
      // create new query out of refs. http://bit.ly/2LG3MLg
      const getAllApptDataQuery = apptRefs.map(ref => {
        return q.Get(ref)
      })
      // then query the refs
      return faunaClient
        .query(getAllApptDataQuery)
        .then(ret => {
          let retValue = ""
          // then find the ref that matches param
          ret.forEach(ref => {
            if (ref.data.payload.event.uuid === data.payload.event.uuid)
              retValue = ref.ref.id
          })
          return faunaClient
            .query(q.Delete(q.Ref(`classes/appointments/${retValue}`)))
            .then(response => {
              return {
                statusCode: 200,
                body: JSON.stringify(response),
              }
            })
            .catch(err1 => {
              return {
                statusCode: 400,
                body: JSON.stringify(err1),
              }
            })
        })
        .catch(err2 => {
          return {
            statusCode: 400,
            body: JSON.stringify(err2),
          }
        })
    })
    .catch(error => {
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      }
    })
}
