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
    .query(q.Delete(q.Ref(`classes/clients/${id}`)))
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
