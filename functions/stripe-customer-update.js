var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const getId = require("./utils/getId")

exports.handler = (event, context, callback) => {
  const data = JSON.parse(event.body)
  const id = getId(event.path)

  return stripe.customers
    .update(id, data, { maxNetworkRetries: 2 })
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "Stripe customer updated",
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
