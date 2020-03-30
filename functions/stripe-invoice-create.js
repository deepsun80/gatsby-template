var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const getId = require("./utils/getId")

module.exports.handler = (event, context, callback) => {
  const id = getId(event.path)
  const requestBody = JSON.parse(event.body)

  return stripe.invoiceItems
    .create({
      customer: id,
      amount: requestBody.amount,
      currency: "usd",
      description: requestBody.description,
    })
    .then(res => {
      return stripe.invoices
        .create({
          customer: id,
          collection_method: "send_invoice",
          days_until_due: 30,
        })
        .then(result => {
          const response = {
            statusCode: 200,
            body: JSON.stringify({
              message: `Stripe invoice created`,
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
