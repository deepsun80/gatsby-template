var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const getId = require("./utils/getId")

module.exports.handler = (event, context, callback) => {
  const id = getId(event.path)

  return stripe.customers
    .del(id)
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: `Stripe customer deleted succesfully`,
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