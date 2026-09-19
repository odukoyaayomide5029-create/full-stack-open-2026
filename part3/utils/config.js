require('dotenv').config()
const url = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001
module.exports = { url, PORT }