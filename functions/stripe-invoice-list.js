var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const getId = require("./utils/getId")

exports.handler = (event, context, callback) => {
  const id = getId(event.path)

  return stripe.invoices
    .list({ maxNetworkRetries: 2 })
    .then(res => {
      const result = res.data.filter(item => item.customer === id)
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "Stripe invoices for customer",
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
}
