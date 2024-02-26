const artworkRouter = require('express').Router()
const Artwork = require('../models/artwork')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const getTokenFrom = require('../utils/auth').getTokenFrom
const config = require('../utils/config')
const {upload} = require('../utils/middleware')
const pagination = require('../utils/pagination')
  
/* Get Artworks */
artworkRouter.post('/', async (req, res) => {
    const { pageIndex, pageSize, query } = req.body
    try {
        let [artworks, total] = await Promise.all([
            Artwork.find({}), // Fetch all products
            Artwork.countDocuments({}) // Count total number of products
        ]);

        if (query) {
            filteredData = pagination.wildCardSearch(artworks, query, 'name'); // Assuming 'name' is the field you want to search on
            total = filteredData.length;
            artworks = pagination.paginate(filteredData, pageSize, pageIndex); // Paginate the filtered data
        } else {
            artworks = pagination.paginate(artworks, pageSize, pageIndex); // Paginate all artworks if no query
        }
        res.json({
            data: artworks,
            total: total
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
})

/* Get Single Product */
artworkRouter.get('/:id', (req, res) => {
    const id = req.params.id
    Artwork.findById(id).populate('category').then(artwork => {
        res.json(artwork)
    }).catch(error => {
        res.json({
            message: `The Artwork Doesn't Exist`
        })
    })
})

// const validateArtist = (body) => {
//     if (!body.name) {
//         return 'Name'
//     }
//     else if (!body.bio) {
//         return 'Bio'
//     }
//     else if (!body.website) {
//         return 'Website'
//     }
//     else {
//         return ''
//     }
// }

artworkRouter.post('/new', upload.array('images[]', 5) , async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req, res), config.JWTSECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }
    const {title, description, category, width, height, sizeUnit, price, medium, deliveredAs, createdIn, isSold} = req.body;
    const imagePaths = req.files.map(file => file.path); 
    const newArtwork = new Artwork({
        title,
        description,
        category,
        width,
        height,
        sizeUnit,
        price,
        medium,
        deliveredAs,
        createdIn,
        isSold,
        imageUrls:imagePaths
    })
    newArtwork.save()
        .then((response) => {
            logger.info('Artwork saved')
            res.json(response)
        })
        .catch((err) => {
            logger.info('Artwork not saved')
            logger.info(err)
            res.status(500).json(err)
        })
})


module.exports = artworkRouter 