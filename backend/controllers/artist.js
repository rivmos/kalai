const artistRouter = require('express').Router()
const Artist = require('../models/artist')
const Artwork = require('../models/artwork')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const getTokenFrom = require('../utils/auth').getTokenFrom
const config = require('../utils/config')
const { upload } = require('../utils/middleware')
const { verifyTokenMiddleware } = require('../utils/auth')

// artistRouter.use(verifyTokenMiddleware)

/* Get Products */
artistRouter.get('/', (req, res) => {
    Artist.find({}).populate('artworks', 'imageUrl').then((artist) => {
        res.json(artist)
    }).catch(error => res.json(error))
})

/* Get Single Product */
artistRouter.get('/:id', verifyTokenMiddleware, (req, res) => {
    const id = req.params.id
    Artist.findById(id).populate('artworks').then(artist => {
        res.json(artist)
    }).catch(error => {
        res.json({
            message: `The Artist Doesn't Exist`
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
artistRouter.post('/save', async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req), config.JWTSECRET);
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' });
    }

    const { id, name, bio, website, artworks } = req.body;

    // Optional: Add validation logic here for the request body.

    try {
        let artist;
        if (id) {
            // Update existing artist
            artist = await Artist.findById(id);
            if (!artist) {
                return res.status(404).json({ error: 'Artist not found' });
            }
            artist.name = name;
            artist.bio = bio;
            artist.website = website;
            // Update artworks logic here, if necessary.
        } else {
            // Create new artist
            artist = new Artist({ name, bio, website, artworks });
        }

        const savedArtist = await artist.save();

        // Optional: Update artworks relationship here, if necessary.

        logger.info('Artist saved');
        res.json(savedArtist);
    } catch (err) {
        logger.error('Error saving artist', err);
        res.status(500).json(err);
    }
});



artistRouter.get('/:artistId/artworks', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.artistId).populate('artworks');
        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        const artworks = artist.artworks;
        res.json(artworks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = artistRouter 