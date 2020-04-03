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
      return client
        .query(getAllClientDataQuery)
        .then(ret => {
          // let retValue = ""
          // then find the ref that matches param
          // ret.forEach(ref => {
          //   if (ref.data.email === data.payload.invitee.email) {
          //     retValue = ref
          //   }
          // })
          const test = {
            name: "Sandeep Chandran",
            email: "deepsun80@yahoo.com",
            phone: "(956) 371-3869",
            address: "Honeybee",
            stripe_id: "cus_GzFNnSb3rhU9ok",
            customer: true,
            appointment: {},
          }
          return client
            .query(
              q.Update(q.Ref(`classes/clients/261722529585955346`), {
                test,
              })
            )
            .then(response => {
              console.log("success", response)
              return {
                statusCode: 200,
                body: JSON.stringify(response),
              }
            })
            .catch(error2 => {
              console.log("error2", error2)
              return {
                statusCode: 400,
                body: JSON.stringify(error2),
              }
            })
        })
        .catch(err => {
          console.log("err", err)
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
