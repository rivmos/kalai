/* Instanciations */
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

/* Express Application Instance */
const app = express()

/* Config Imports */
const config = require('./utils/config')
const logger = require('./utils/logger')

/* Router Imports */
const artistRouter = require('./controllers/artist')
const artworkRouter = require('./controllers/artwork')
const subscriberRouter = require('./controllers/subscriber')
const enquiryRouter = require('./controllers/enquiry')
const usersRouter = require('./controllers/users')
const categoryRouter = require('./controllers/category')
const dashboardRouter = require('./controllers/dashboard')
const bannerRouter = require('./controllers/banner')

/* Middlewares Imports */
const { unknownEndpoint, requestLogger } = require('./utils/middleware')

/* Middlewares Usage*/
app.use(cors())
app.use(express.json())

// For static serving user files
app.use('/uploads', express.static('uploads'))
// app.use(requestLogger)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/artists', artistRouter)
app.use('/api/artworks', artworkRouter)
app.use('/api/subscribers', subscriberRouter)
app.use('/api/enquiries', enquiryRouter)
app.use('/api/banner', bannerRouter)
app.use('/api/', usersRouter)


/* Mongoose Connection */
mongoose.connect(config.MONGO_URI)
    .then(() => {
        logger.info('Connected to MongoDB');
    })
    .catch((error) => {
        logger.error('Failed to connect to MongoDB:', error.message);
        process.exit(1); // Exit the application if unable to connect to the database
    });

/* API Routes */

/* Root */
app.get('/', (req, res) => {
    res.send('Gallery Server')
})

/* Unknown EndPoint Route */
app.use(unknownEndpoint)

/*Generic Error Handling Middleware */
app.use((error, req, res, next) => {
    logger.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(config.PORT, () => {
    logger.info(`The Server Is Running On Port : ${config.PORT}`)
})