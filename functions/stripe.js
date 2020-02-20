require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

var stripe = require("stripe")("sk_test_VC299rSfd6yz7t2e17dwsinl00vZ1Uv2I1")

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
