var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const getId = require("./utils/getId")

module.exports.handler = (event, context, callback) => {
  const id = getId(event.path)

  return stripe.invoices
    .voidInvoice(id)
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: `Stripe invoice voided`,
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