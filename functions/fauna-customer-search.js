/* Import faunaDB sdk */
const faunadb = require("faunadb")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.handler = (event, context) => {
  const data = JSON.parse(event.body)
  console.log("Function `fauna-customer-search` invoked")
  return client
    .query(q.Paginate(q.Match(q.Ref("indexes/all_clients"))))
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
          let retValue = {}
          // then find the ref that matches param
          ret.forEach(ref => {
            if (ref.data.email === data) retValue = ref
          })
          return {
            statusCode: 200,
            body: JSON.stringify(retValue),
          }
        })
        .catch(err => {
          console.log("error", err)
          return {
            statusCode: 400,
            body: JSON.stringify(err),
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
