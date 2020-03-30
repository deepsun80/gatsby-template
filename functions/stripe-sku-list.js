var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports.handler = (event, context, callback) => {
  return stripe.skus
    .list()
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: `Stripe skus`,
          result,
        }),
      }
      callback(null, response)
    })
    .catch(err => {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          error: err.message,
        }),
      }
      callback(null, response)
    })
}
