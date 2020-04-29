var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const getId = require("./utils/getId")

exports.handler = (event, context, callback) => {
  const id = getId(event.path)
  const requestBody = JSON.parse(event.body)

  return requestBody.forEach(item => {
    stripe.invoiceItems
      .create(
        {
          customer: id,
          amount: item.amount,
          currency: "usd",
          description: item.description,
        },
        { maxNetworkRetries: 2 }
      )
      .then(result => {
        const response = {
          statusCode: 200,
          body: JSON.stringify({
            message: "Stripe invoice item created",
            result,
          }),
        }
        callback(null, response)
      })
      .catch(error => {
        const response = {
          statusCode: 500,
          body: JSON.stringify({
            error: `Stripe error: ${error.message}`,
          }),
        }
        callback(null, response)
      })
  })
}
