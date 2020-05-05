const faunadb = require("faunadb")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body)
  const apptItem = {
    data: { ...data, invoice: {} },
  }

  /* Customer Added New Event */
  if (data.event === "invitee.created") {
    return client
      .query(q.Create(q.Ref("classes/appointments"), apptItem))
      .then(response => {
        return {
          statusCode: 200,
          body: JSON.stringify(response),
        }
      })
      .catch(error => {
        return {
          statusCode: 400,
          body: JSON.stringify(error),
        }
      })
  }

  /* Customer Cancelled Event */
  return client
    .query(
      q.Paginate(q.Match(q.Ref("indexes/all_appointments")), { size: 2000 })
    )
    .then(response => {
      const apptRefs = response.data
      const getAllApptDataQuery = apptRefs.map(ref => {
        return q.Get(ref)
      })
      return client
        .query(getAllApptDataQuery)
        .then(ret => {
          let retValue = ""
          ret.forEach(ref => {
            if (ref.data.payload.event.uuid === data.payload.event.uuid)
              retValue = ref.ref.id
          })
          return client
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
