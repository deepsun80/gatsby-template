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
      .then(() => {
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
                message: "Appointment added and Twilio sms sent",
                result,
              }),
            }
          })
        // .catch(err => {
        //   return {
        //     statusCode: 200,
        //     body: JSON.stringify(`Twilio error: ${err.message}`),
        //   }
        // })
      })
    // .catch(error => {
    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify(error),
    //   }
    // })
  }

  /* Customer Cancelled Event */
  return faunaClient
    .query(q.Paginate(q.Match(q.Ref("indexes/all_appointments"))))
    .then(response => {
      const apptRefs = response.data
      const getAllApptDataQuery = apptRefs.map(ref => {
        return q.Get(ref)
      })
      return faunaClient
        .query(getAllApptDataQuery)
        .then(ret => {
          let retValue = ""
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
