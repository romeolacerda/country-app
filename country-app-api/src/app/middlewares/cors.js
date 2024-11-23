require('dotenv').config();


module.exports = (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', `${process.env.FRONTEND}`)
    response.setHeader('Access-Control-Allow-Methods', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')
    response.setHeader('Access-Control-Max-Age', '10')
    next()
}
