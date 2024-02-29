const artistRouter = require('express').Router()
const Artist = require('../models/artist')
const Artwork = require('../models/artwork')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const getTokenFrom = require('../utils/auth').getTokenFrom
const config = require('../utils/config')
const { upload, uploadAvatar } = require('../utils/middleware')
const { verifyTokenMiddleware } = require('../utils/auth')
const pagination = require('../utils/pagination')

// artistRouter.use(verifyTokenMiddleware)

/* Get Products */
artistRouter.post('/', async (req, res) => {
    const { pageIndex, pageSize, query } = req.body
    try {
        let [artists, total] = await Promise.all([
            Artist.find({}).populate('artworks', 'imageUrls'), // Fetch all products
            Artist.countDocuments({}) // Count total number of products
        ]);

        if (query) {
            filteredData = pagination.wildCardSearch(artists, query, 'name'); // Assuming 'name' is the field you want to search on
            total = filteredData.length;
            artists = pagination.paginate(filteredData, pageSize, pageIndex); // Paginate the filtered data
        } else {
            artists = pagination.paginate(artists, pageSize, pageIndex); // Paginate all artists if no query
        }
        res.json({
            data: artists,
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

artistRouter.get('/all', async (req, res) => {
    try {
        const artists = await Artist.find({})
        res.json(artists)
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
artistRouter.get('/:id', (req, res) => {
    const id = req.params.id
    Artist.findById(id).populate('artworks').then(artist => {
        res.json(artist)
    }).catch(error => {
        res.json({
            message: `The Artist Doesn't Exist`
        })
    })
})


artistRouter.post('/save', uploadAvatar.single('avatar'),async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req), config.JWTSECRET);
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' });
    }

    const { id, name, bio, website, artworks, avatar } = req.body;

    const uploadedImage = req?.file?.filename

    // Optional: Add validation logic here for the request body.

    try {
        let artist;
        if (id) {
            const avatarNotUpdated = typeof avatar === 'string'

            // Update existing artist
            artist = await Artist.findById(id);
            if (!artist) {
                return res.status(404).json({ error: 'Artist not found' });
            }
            artist.name = name;
            artist.bio = bio;
            artist.website = website;
            artist.artworks = artworks;
            if(avatarNotUpdated){
                artist.avatar = avatar
            }
            else{
                artist.avatar = uploadedImage
            }
            // Update artworks logic here, if necessary.
        } else {
            // Create new artist
            artist = new Artist({ name, bio, website, artworks, avatar:uploadedImage });
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

artistRouter.delete('/delete', verifyTokenMiddleware, async (req, res) => {
    const { id } = req.body
    try {
        // const result = await Artist.deleteOne({ _id: id }); // Assuming _id is the correct field
        // await Artwork.deleteMany({ artist: id });
        // if (result.deletedCount === 0) {
        //     return res.status(404).send('No artist found with that ID');
        // }
        // res.send('Artist deleted successfully');

        const artist = await Artist.findById(id);
    
        if (!artist) {
          return res.status(404).json({ message: "Artist not found" });
        }
    
        // Delete associated artworks
        await Artwork.deleteMany({ artist: artist.id });
        await Artist.deleteOne({ _id: id })
    
        res.json({ message: "Artist and associated artworks deleted successfully" });
    } catch (error) {
        console.error("Error deleting artist and their artwork: ", error); // Example of logging the error
        res.status(500).send(error.message);
    }
});


module.exports = artistRouter 