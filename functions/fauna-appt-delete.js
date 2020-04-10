/* Import faunaDB sdk */
const faunadb = require("faunadb")
const getId = require("./utils/getId")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.handler = async (event, context) => {
  const id = getId(event.path)
  return client
    .query(q.Delete(q.Ref(`classes/appointments/${id}`)))
    .then(result => {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: `Appointment deleted`,
          result,
        }),
      }
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
