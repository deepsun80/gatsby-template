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
  console.log("Function `fauna-appt-create` invoked", data)
  const apptItem = {
    data: { ...data, invoice: {} },
  }

  /* Customer Added New Event */
  if (data.event === "invitee.created") {
    /* construct the fauna query */
    return client
      .query(q.Create(q.Ref("classes/appointments"), apptItem))
      .then(response => {
        console.log("success", response)
        /* Success! return the response with statusCode 200 */
        return {
          statusCode: 200,
          body: JSON.stringify(response),
        }
      })
      .catch(error => {
        console.log("error", error)
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
      const clientRefs = response.data
      console.log("Client refs", clientRefs)
      console.log(`${clientRefs.length} clients found`)
      // create new query out of refs. http://bit.ly/2LG3MLg
      const getAllClientDataQuery = clientRefs.map(ref => {
        return q.Get(ref)
      })
      // then query the refs
      return client
        .query(getAllClientDataQuery)
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
              console.log("success", response)
              return {
                statusCode: 200,
                body: JSON.stringify(response),
              }
            })
            .catch(err1 => {
              console.log("error", err1)
              return {
                statusCode: 400,
                body: JSON.stringify(err1),
              }
            })
        })
        .catch(err2 => {
          console.log("error", err2)
          return {
            statusCode: 400,
            body: JSON.stringify(err2),
          }
        })
    })
    .catch(error => {
      console.log("error", error)
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      }
    })
}
