/* Instanciations */
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

/* Express Application Instance */
const app = express()

/* Model Imports */
const Product = require('./models/artist')
const Artwork = require('./models/artwork')

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
app.use('/api/', usersRouter)


/* Mongoose Connection */
mongoose.connect(config.MONGO_URI).then(() => logger.info('connection successfull')).catch(() => logger.info('connection failed'))


/* API Routes */

/* Root */
app.get('/', (req, res) => {
    res.send('Gallery Server')
})

Artwork.insertMany([
    {
        title: "Sunset Over Mountains",
        description: "An evocative landscape capturing the serene beauty of a mountainous sunset.",
        imageUrl: "https://example.com/artworks/sunset-over-mountains.jpg",
        artist: "65bc9a8ec4e1b943379d6334",
        width: 24,
        height: 36,
        sizeUnit: "in",
        price: 1200,
        medium: "Oil on Canvas",
        deliveredAs: "Framed",
        createdIn: 2021,
        itemCode: 10001
    },
    {
        title: "Abstract Thoughts",
        description: "A vibrant abstract painting that stimulates the viewer's imagination.",
        imageUrl: "https://example.com/artworks/abstract-thoughts.jpg",
        artist: "65bc9a8ec4e1b943379d6334",
        width: 18,
        height: 24,
        sizeUnit: "in",
        price: 950,
        medium: "Acrylic",
        deliveredAs: "Canvas",
        createdIn: 2022,
        itemCode: 10002
    },
    {
        title: "The Quiet Forest",
        description: "A peaceful and soothing depiction of a serene forest at dawn.",
        imageUrl: "https://example.com/artworks/the-quiet-forest.jpg",
        artist: "65bc9a8ec4e1b943379d6334",
        width: 48,
        height: 24,
        sizeUnit: "in",
        price: 1800,
        medium: "Watercolor",
        deliveredAs: "Rolled Canvas",
        createdIn: 2020,
        itemCode: 10003
    },
    {
        title: "City Lights",
        description: "A bustling cityscape under the enchantment of the night's luminescence.",
        imageUrl: "https://example.com/artworks/city-lights.jpg",
        artist: "65bc938f2a6a4504536eaa06",
        width: 40,
        height: 30,
        sizeUnit: "in",
        price: 1500,
        medium: "Digital",
        deliveredAs: "Print",
        createdIn: 2023,
        itemCode: 10004
    },
    {
        title: "Ocean's Embrace",
        description: "Capturing the majestic power and beauty of the ocean's waves.",
        imageUrl: "https://example.com/artworks/oceans-embrace.jpg",
        artist: "65bca25a19cdc403e69369ee",
        width: 60,
        height: 24,
        sizeUnit: "in",
        price: 2100,
        medium: "Oil on Canvas",
        deliveredAs: "Framed",
        createdIn: 2019,
        itemCode: 10005
    },
    {
        title: "Whispers of the Past",
        description: "An ethereal piece that bridges the gap between history and memory through delicate brush strokes.",
        imageUrl: "https://example.com/artworks/whispers-of-the-past.jpg",
        artist: "65bca25a19cdc403e69369ee",
        width: 32,
        height: 24,
        sizeUnit: "cm",
        price: 1300,
        medium: "Acrylic",
        deliveredAs: "Canvas",
        createdIn: 2022,
        itemCode: 10006
    },
    {
        title: "Garden of Dreams",
        description: "A vivid portrayal of a surreal garden where dreams take visual form.",
        imageUrl: "https://example.com/artworks/garden-of-dreams.jpg",
        artist: "65bca25a19cdc403e69369ee",
        width: 45,
        height: 30,
        sizeUnit: "in",
        price: 1750,
        medium: "Watercolor",
        deliveredAs: "Rolled Canvas",
        createdIn: 2021,
        itemCode: 10007
    }
]
).then(function () {
    console.log("Data inserted") // Success 
}).catch(function (error) {
    console.log(error)     // Failure 
});


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