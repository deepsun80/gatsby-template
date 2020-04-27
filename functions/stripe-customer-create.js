var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.handler = (event, context, callback) => {
  const requestBody = JSON.parse(event.body)

  return stripe.customers
    .create({
      email: requestBody.email,
      name: requestBody.name,
      phone: requestBody.phone,
    })
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "Stripe customer created",
          result,
        }),
      }
      callback(null, response)
    })
    .catch(error => {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          error: `Stripe error: ${error.message}`,
        }),
      }
      callback(null, response)
    })
}
