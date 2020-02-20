require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const axios = require("axios")

const statusCode = 200
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

exports.handler = async function(event) {
  // We only care to do anything if this is our POST request.
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 200, // <-- Important!
      headers,
      body: "This was not a POST request!",
    }
  }

  // Parse the body contents into an object.
  const data = JSON.parse(event.body)

  // Make sure we have all required data. Otherwise, get outta here.
  if (!data.token || !data.amount || !data.idempotency_key) {
    const message = "Required information is missing!"

    console.error(message)

    return {
      statusCode,
      headers,
      body: JSON.stringify({
        status: "failed",
        message,
      }),
    }
  }

  let invoice

  try {
    invoice = await stripe.invoices.create({ customer: "cus_GlXuB4Ue4Vmnyn" })
  } catch (e) {
    let message = e.message

    console.error(message)

    return {
      statusCode: 424,
      headers,
      body: JSON.stringify({
        status: "failed",
        message,
      }),
    }
  }

  const status =
    invoice === null || invoice.status !== "succeeded"
      ? "failed"
      : invoice.status

  return {
    statusCode,
    headers,
    body: JSON.stringify({
      status,
      message: "Invoice successfully created!",
    }),
  }
}
