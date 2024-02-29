const bannerRouter = require('express').Router()
const Banner = require('../models/banner')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const getTokenFrom = require('../utils/auth').getTokenFrom
const config = require('../utils/config')
const {uploadBanner} = require('../utils/middleware')
const { verifyTokenMiddleware } = require('../utils/auth')
const pagination = require('../utils/pagination')
  
/* Get Products */
bannerRouter.post('/', async (req, res) => {
    const { pageIndex, pageSize, query } = req.body
    try {
        let [bannerImages, total] = await Promise.all([
            Banner.find({}), // Fetch all bannerImages
            Banner.countDocuments({}) // Count total number of products
        ]);

        if (query) {
            filteredData = pagination.wildCardSearch(bannerImages, query); // Assuming 'name' is the field you want to search on
            total = filteredData.length;
            bannerImages = pagination.paginate(filteredData, pageSize, pageIndex); // Paginate the filtered data
        } else {
            bannerImages = pagination.paginate(bannerImages, pageSize, pageIndex); // Paginate all artists if no query
        }
        res.json({
            data: bannerImages,
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

bannerRouter.get('/all', async (req, res) => {
    try {
        const bannerImages = await Banner.find({})
        res.json(bannerImages)
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
})


bannerRouter.get('/:id', (req, res) => {
    const id = req.params.id
    Banner.findById(id).then(bannerImage => {
        res.json(bannerImage)
    }).catch(error => {
        res.json({
            message: `The Banner Image Doesn't Exist`
        })
    })
})


bannerRouter.post('/save',uploadBanner.single('img') , async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req, res), config.JWTSECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }
    const {id, title, img} = req.body;

    const uploadedImage = req?.file?.filename

    if (id) {
        // Update existing artwork
        const imgNotUpdated = typeof img === 'string'

        const bannerImage = imgNotUpdated ? img : uploadedImage

        Banner.findByIdAndUpdate(id, {
            title, img: bannerImage
        }, { new: true })
            .then(updatedCategory => {
                if (!updatedCategory) {
                    return res.status(404).json({ error: 'Banner not found' });
                }
                logger.info('Banner updated');
                res.json(updatedCategory);
            })
            .catch(err => {
                logger.error('Error Updating Banner:', err);
                res.status(500).json({ error: 'Internal server error' });
            });
    } else {
        // Create new artwork
        const newBannerImage = new Banner({
            title,
            img:uploadedImage
        });

        newBannerImage.save()
            .then(response => {
                logger.info('New Banner Saved');
                res.json(response);
            })
            .catch(err => {
                logger.error('Error saving new Banner:', err);
                res.status(500).json({ error: 'Internal server error' });
            });
    }

})


bannerRouter.delete('/delete', verifyTokenMiddleware, async (req, res) => {
    const { id } = req.body
    try {
        const result = await Banner.deleteOne({ _id: id }); // Assuming _id is the correct field
        if (result.deletedCount === 0) {
            return res.status(404).send('No Banner image found with that ID');
        }
        res.send('Banner image deleted successfully');
    } catch (error) {
        logger.error("Error deleting banner image: ", error); // Example of logging the error
        res.status(500).send(error.message);
    }
});

module.exports = bannerRouter 