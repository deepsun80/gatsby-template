const axios = require("axios")

exports.handler = async (event, context, callback) => {
  const parsedBody = JSON.parse(event.body)
  try {
    const response = await axios({
      method: "post",
      url: "http://requestbin.net/r/wppv6lwp",
      data: parsedBody,
    })

    // const data = await response.json()
    return callback(null, {
      statusCode: 200,
      body: `Successfully posted ${JSON.stringify(parsedBody)}`,
    })
  } catch (error) {
    console.log(error)
    return callback(new Error("something went wrong"))
  }
}
