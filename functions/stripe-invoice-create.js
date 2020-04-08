var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const getId = require("./utils/getId")

module.exports.handler = (event, context, callback) => {
  const id = getId(event.path)
  const requestBody = JSON.parse(event.body)

  requestBody.forEach(item => {
    stripe.invoiceItems.create({
      customer: id,
      amount: item.amount,
      currency: "usd",
      description: item.description,
    })
  })

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
