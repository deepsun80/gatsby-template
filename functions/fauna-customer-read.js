/* Import faunaDB sdk */
const faunadb = require("faunadb")
const getId = require("./utils/getId")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.handler = (event, context) => {
  const id = getId(event.path)
  return client
    .query(q.Get(q.Ref(`classes/clients/${id}`)))
    .then(result => {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Customer found",
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
