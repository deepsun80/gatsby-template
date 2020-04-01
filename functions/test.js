// const axios = require("axios")

exports.handler = async (event, context) => {
  // const parsedBody = JSON.parse(event.body)
  try {
    // const response = await axios({
    //   method: "post",
    //   url: "http://requestbin.net/r/wppv6lwp",
    //   data: parsedBody,
    // })

    // const data = await response.json()
    return {
      statusCode: 200,
      body: event.body,
    }
  } catch (error) {
    console.log(error)
    return new Error("something went wrong")
  }
}
