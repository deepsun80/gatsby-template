var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports.handler = (event, context, callback) => {
  return stripe.plans
    .list()
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
          error: error.message,
        }),
      }
      callback(null, response)
    })
}
