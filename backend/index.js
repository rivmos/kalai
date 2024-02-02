/* Instanciations */
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

/* Express Application Instance */
const app = express()

/* Model Imports */
const Product = require('./models/artist')

/* Config Imports */
const config = require('./utils/config')
const logger = require('./utils/logger')

/* Router Imports */
const artistRouter = require('./controllers/artist')
const artworkRouter = require('./controllers/artwork')
const subscriberRouter = require('./controllers/subscriber')
const enquiryRouter = require('./controllers/enquiry')
const usersRouter = require('./controllers/users')

/* Middlewares Imports */
const { unknownEndpoint, requestLogger } = require('./utils/middleware')

/* Middlewares Usage*/
app.use(cors())
app.use(express.json())
// app.use(requestLogger)
app.use('/api/artists', artistRouter)
app.use('/api/artworks', artworkRouter)
app.use('/api/subscribers', subscriberRouter)
app.use('/api/enquiries', enquiryRouter)
app.use('/api/auth', usersRouter)


/* Mongoose Connection */
mongoose.connect(config.MONGO_URI).then(() => logger.info('connection successfull')).catch(() => logger.info('connection failed'))


/* API Routes */

/* Root */
app.get('/', (req, res) => {
    res.send('Gallery Server')
})


/* Get DropDown Data */
app.get('/api/dropdowndata/', (req, res) => {
    const multilevelDropdownData = [];

    Product.find({}).then((products) => {
        for (const product of products) {
            const mainCategory = product.mainCategory;
            const subCategory = product.subCategory;
            const productName = product.productName;
            const productId = product.id

            multilevelDropdownData.push([mainCategory, subCategory, productName, productId]);
        }

        const multilevelJson = [];

        for (const level of multilevelDropdownData) {
            const mainCategoryExists = multilevelJson.find(item => item.title === level[0])
            if (!mainCategoryExists) {
                const node = {
                    title: level[0],
                    children: [
                        {
                            title: level[1],
                            children: [
                                { id: level.slice(-1)[0], title: level[2] }
                            ]
                        }
                    ]
                };
                multilevelJson.push(node);
            }
            else {
                const subCategoryExists = mainCategoryExists.children.find(item => item.title === level[1])
                if (!subCategoryExists) {
                    const node = {
                        title: level[1],
                        children: [
                            {
                                id: level.slice(-1)[0],
                                title: level[2],
                            }
                        ]
                    };
                    mainCategoryExists.children.push(node)
                }
                else {
                    subCategoryExists.children.push({ id: level.slice(-1)[0], title: level[2] })
                }
            }
        }

        res.json(multilevelJson);
        res.end()
    }).catch(error => logger.info(error))
})

app.get('/api/maincategories/', (req, res) => {
    const mainCategories = [];

    Product.find({}).then((products) => {

        for (const product of products) {
            const mainCategory = product.mainCategory;
            const mainCategoriesExists = mainCategories.find(item => item === mainCategory)
            if (!mainCategoriesExists) {
                mainCategories.push(mainCategory);
            }
        }

        res.json(mainCategories);
        res.end()
    }).catch(error => logger.info(error))
})

app.get('/api/subcategories/', (req, res) => {
    const subCategories = [];

    Product.find({}).then((products) => {

        for (const product of products) {
            const subCategory = product.subCategory;
            const subCategoryExists = subCategories.find(item => item === subCategory)
            if (!subCategoryExists) {
                subCategories.push(subCategory);
            }
        }

        res.json(subCategories);
        res.end()
    }).catch(error => logger.info(error))
})

/* Unknown EndPoint Route */
app.use(unknownEndpoint)


app.listen(config.PORT, () => {
    logger.info(`The Server Is Running On Port : ${config.PORT}`)
})