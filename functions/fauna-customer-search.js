/* Import faunaDB sdk */
const faunadb = require("faunadb")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.handler = (event, context) => {
  const data = JSON.parse(event.body)
  return client
    .query(q.Paginate(q.Match(q.Ref("indexes/all_clients"))))
    .then(response => {
      const clientRefs = response.data
      // create new query out of refs. http://bit.ly/2LG3MLg
      const getAllClientDataQuery = clientRefs.map(ref => {
        return q.Get(ref)
      })
      // then query the refs
      return client
        .query(getAllClientDataQuery)
        .then(ret => {
          let result = {}
          // then find the ref that matches param
          ret.forEach(ref => {
            if (ref.data.email.toLowerCase() === data.toLowerCase())
              result = ref
          })
          return {
            statusCode: 200,
            body: JSON.stringify({
              message: `Customer found`,
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
    })
    .catch(error => {
      console.log("error", error)
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: error.message,
        }),
      }
    })
}