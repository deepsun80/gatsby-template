const faunadb = require("faunadb")
const getId = require("./utils/getId")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.handler = (event, context) => {
  const data = JSON.parse(event.body)
  const id = getId(event.path)
  return client
    .query(q.Update(q.Ref(`classes/clients/${id}`), { data }))
    .then(result => {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: `Customer updated`,
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
