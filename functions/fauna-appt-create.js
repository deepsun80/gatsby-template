/* Import faunaDB sdk */
const faunadb = require("faunadb")

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body)
  const apptItem = {
    data: { ...data, invoice: {} },
  }

  /* Customer Added New Event */
  if (data.event === "invitee.created") {
    /* construct the fauna query */
    return client
      .query(q.Create(q.Ref("classes/appointments"), apptItem))
      .then(response => {
        /* Success! return the response with statusCode 200 */
        return {
          statusCode: 200,
          body: JSON.stringify(response),
        }
      })
      .catch(error => {
        /* Error! return the error with statusCode 400 */
        return {
          statusCode: 400,
          body: JSON.stringify(error),
        }
      })
  }

  /* Customer Cancelled Event */
  return client
    .query(q.Paginate(q.Match(q.Ref("indexes/all_appointments"))))
    .then(response => {
      const apptRefs = response.data
      // create new query out of refs. http://bit.ly/2LG3MLg
      const getAllApptDataQuery = apptRefs.map(ref => {
        return q.Get(ref)
      })
      // then query the refs
      return client
        .query(getAllApptDataQuery)
        .then(ret => {
          let retValue = ""
          // then find the ref that matches param
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
