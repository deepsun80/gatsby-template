var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports.handler = (event, context, callback) => {
  const requestBody = JSON.parse(event.body)

  return stripe.invoiceItems
    .create({
      customer: requestBody.customer,
      amount: requestBody.amount,
      currency: "usd",
      description: requestBody.description,
    })
    .then(result => {
      // Success response
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: `Invoice created succesfully!`,
          result,
        }),
      }
      callback(null, response)
    })
    .catch(err => {
      // Error response
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          error: err.message,
        }),
      }
      callback(null, response)
    })
}
