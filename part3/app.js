
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const phonebookRouter = require('./controllers/phonebooks')

const app = express()
app.use(express.static('dist'))

app.use(express.json())
app.use('/api/persons', phonebookRouter)
app.use(middleware.requestLogger)






logger.info('connecting to')

mongoose.connect(config.url, { family: 4 }).then(() => {
    logger.info('connected to MongoDB')
}).catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
})

    module.exports = app

    app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)