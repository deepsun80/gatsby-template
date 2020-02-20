require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports.handler = (event, context, callback) => {
  const requestBody = JSON.parse(event.body)
  const token = requestBody.token.id
  const amount = requestBody.charge.amount
  const currency = requestBody.charge.currency
  const email = requestBody.charge.email

  console.log(requestBody)

  return stripe.charges
    .create({
      // Create Stripe charge with token
      amount,
      currency,
      receipt_email: email,
      description: "Serverless Stripe Test charge",
      source: token,
    })
    .then(charge => {
      // Success response
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: `Charge processed succesfully!`,
          charge,
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
