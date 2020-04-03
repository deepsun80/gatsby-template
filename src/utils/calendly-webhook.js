const faunadb = require("faunadb")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

exports.handler = (event, context) => {
  const data = JSON.parse(event.body)
  console.log("Function 'calendly-webhook' invoked.")
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
      return client.query(getAllClientDataQuery).then(ret => {
        let retValue = {}
        // then find the ref that matches param
        ret.forEach(ref => {
          if (ref.data.email === data.payload.invitee.email) {
            retValue = ref
          }
        })
        // return {
        //   statusCode: 200,
        //   body: JSON.stringify(retValue),
        // }
        return client
          .query(q.Create(q.Ref("classes/clients"), retValue))
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
      })
    })
    .catch(err => {
      console.log("error", err)
      return {
        statusCode: 400,
        body: JSON.stringify(err),
      }
    })
}
