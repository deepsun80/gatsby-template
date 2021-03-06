var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.handler = (event, context, callback) => {
  return stripe.plans
    .list({ maxNetworkRetries: 2 })
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "Stripe plans found",
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
