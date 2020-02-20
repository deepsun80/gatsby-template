import React from "react"
import CheckoutComponent from "../components/CheckoutComponent"
import { StripeProvider } from "react-stripe-elements"

const pay = () => {
  return (
    <div>
      <h1>Test Pay</h1>
      <StripeProvider apiKey="<pk_test_key>">
        <CheckoutComponent />
      </StripeProvider>
    </div>
  )
}

export default pay
