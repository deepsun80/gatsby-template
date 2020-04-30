var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const getId = require("./utils/getId")

exports.handler = (event, context, callback) => {
  const id = getId(event.path)
  const requestBody = JSON.parse(event.body)

  return stripe.subscriptions
    .create(
      {
        customer: id,
        // collection_method: "send_invoice",
        // days_until_due: 30,
        items: requestBody,
      },
      { maxNetworkRetries: 2 }
    )
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "Stripe subscription created",
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
