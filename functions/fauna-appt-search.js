/* Import faunaDB sdk */
const faunadb = require("faunadb")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.handler = (event, context) => {
  const data = JSON.parse(event.body)
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
          let result = []
          // then find the ref that matches param
          ret.forEach(ref => {
            if (
              ref.data.payload.invitee.email.toLowerCase() ===
              data.toLowerCase()
            )
              result.push(ref)
          })
          return {
            statusCode: 200,
            body: JSON.stringify({
              message: "Appointment found",
              result,
            }),
          }
        })
        .catch(err => {
          return {
            statusCode: 400,
            body: JSON.stringify({
              error: err.message,
            }),
          }
        })
    })
    .catch(error => {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: error.message,
        }),
      }
    })
}
