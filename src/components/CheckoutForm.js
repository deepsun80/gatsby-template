import React, { Component } from "react"
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
} from "react-stripe-elements"

import axios from "axios"
import AddressSection from "./AddressSection"
import CardSection from "./CardSection"
import Success from "./Success"

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: undefined,
      email: undefined,
      address: undefined,
      city: undefined,
      state: undefined,
      program: undefined,
      price: undefined,
      success: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const name = event.target.name
    this.setState({ [name]: event.target.value })
  }

  handleSubmit = ev => {
    ev.preventDefault()

    this.props.stripe
      .createToken({
        name: this.state.name,
        address_city: this.state.city,
        address_line1: this.state.address,
        address_state: this.state.state,
        address_country: "US",
      })
      .then(({ token }) => {
        const charge = JSON.stringify({
          token,
          charge: {
            amount: 50,
            currency: "usd",
            email: this.state.email,
            number: this.state.number,
          },
        })
        axios.post("/.netlify/functions/charge", charge).catch(function(error) {
          console.log(error)
        })
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.success === false ? (
          <div>
            <label>
              Name
              <input
                type="text"
                name="name"
                onChange={this.handleChange}
                placeholder="Jane Doe"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                onChange={this.handleChange}
                placeholder="jane.doe@example.com"
                required
              />
            </label>
            <label>
              Address
              <input
                type="text"
                name="address"
                onChange={this.handleChange}
                placeholder="100 Legends Way"
                required
              />
            </label>
            <label>
              Cell
              <input
                type="tel"
                name="number"
                onChange={this.handleChange}
                placeholder="781-111-1111"
                required
              />
            </label>
            <label>
              City
              <input
                type="text"
                name="city"
                onChange={this.handleChange}
                placeholder="Boston"
                required
              />
            </label>
            <label>
              State
              <input
                type="text"
                name="state"
                onChange={this.handleChange}
                placeholder="MA"
                required
              />
            </label>

            <hr />

            <label>
              Card number
              <CardNumberElement />
            </label>
            <label>
              CVC
              <CardCVCElement />
            </label>
            <label>
              Expiration date
              <CardExpiryElement />
            </label>
            <label>
              Postal code
              <PostalCodeElement />
            </label>
          </div>
        ) : (
          <h3>Success!!</h3>
        )}
        <Button>Pay $1</Button>
      </form>
    )
  }
}

export default injectStripe(CheckoutForm)
