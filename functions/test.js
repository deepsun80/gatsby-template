const axios = require("axios")

// exports.handler = async (event, context) => {
//   const parsedBody = JSON.parse(event.body)
//   try {
//     // const response = await axios({
//     //   method: "post",
//     //   url: "http://requestbin.net/r/wppv6lwp",
//     //   data: parsedBody,
//     // })

//     // const data = await response.json()
//     // alert(parsedBody)
//     return {
//       statusCode: 200,
//       body: parsedBody,
//     }
//   } catch (error) {
//     console.log(error)
//     return new Error("something went wrong")
//   }
// }

exports.handler = (event, context) => {
  const parsedBody = JSON.parse(event.body)
  axios({
    method: "post",
    url: "http://requestbin.net/r/1f81yr81",
    data: parsedBody,
  })
    .then(result => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          statusCode: 200,
          body: result,
        }),
      }
      callback(null, response)
    })
    .catch(err => {
      const response = {
        statusCode: 500,
        body: JSON.stringify({
          error: err.message,
        }),
      }
      callback(null, response)
    })
}
