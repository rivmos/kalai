const artworkRouter = require('express').Router()
const Artwork = require('../models/artwork')
const Artist = require('../models/artist')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const getTokenFrom = require('../utils/auth').getTokenFrom
const config = require('../utils/config')
const {upload} = require('../utils/middleware')
const { verifyTokenMiddleware } = require('../utils/auth')
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
            filteredData = pagination.wildCardSearch(artworks, query); // Assuming 'name' is the field you want to search on
            total = filteredData.length;
            artworks = pagination.paginate(filteredData, pageSize, pageIndex); // Paginate the filtered data
        } else {
            artworks = pagination.paginate(artworks, pageSize, pageIndex); // Paginate all artists if no query
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
    Artwork.findById(id).then(artwork => {
        res.json(artwork)
    }).catch(error => {
        res.json({
            message: `The Artwork Doesn't Exist`
        })
    })
})


artworkRouter.post('/save', upload.array('imgList[]'), async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req, res), config.JWTSECRET);
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' });
    }
    const { id, title, description, category, width, height, sizeUnit, price, medium, deliveredAs, createdIn, isSold, artist } = req.body;

    const images = req.files.map(file => file.filename);

    if (id) {
        // Update existing artwork
        Artwork.findByIdAndUpdate(id, {
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
            artist,
            imgList: images
        }, { new: true })
            .then(updatedArtwork => {
                if (!updatedArtwork) {
                    return res.status(404).json({ error: 'Artwork not found' });
                }
                logger.info('Artwork updated');
                res.json(updatedArtwork);
            })
            .catch(err => {
                logger.error('Error updating artwork:', err);
                res.status(500).json({ error: 'Internal server error' });
            });
    } else {
        // Create new artwork
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
            artist,
            imgList: images
        });
        const savedArtwork = await newArtwork.save()
        const artistSelected = await Artist.findById(artist)

        artistSelected.artworks.push(savedArtwork.id)

        artistSelected.save()
            .then(response => {
                logger.info('New artwork saved');
                res.json(response);
            })
            .catch(err => {
                logger.error('Error saving new artwork:', err);
                res.status(500).json({ error: 'Internal server error' });
            });
    }
});


artworkRouter.delete('/delete', verifyTokenMiddleware, async (req, res) => {
    const { id } = req.body
    try {
        const result = await Artwork.deleteOne({ _id: id }); // Assuming _id is the correct field
        if (result.deletedCount === 0) {
            return res.status(404).send('No Arwork found with that ID');
        }
        res.send('Artwork deleted successfully');
    } catch (error) {
        console.error("Error deleting artist and their artwork: ", error); // Example of logging the error
        res.status(500).send(error.message);
    }
});


module.exports = artworkRouter 