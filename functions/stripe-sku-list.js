var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports.handler = (event, context, callback) => {
  return stripe.skus
    .list()
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "Stripe skus found",
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
