const categoryRouter = require('express').Router()
const Category = require('../models/category')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const getTokenFrom = require('../utils/auth').getTokenFrom
const config = require('../utils/config')
const {upload, uploadCategory} = require('../utils/middleware')
const { verifyTokenMiddleware } = require('../utils/auth')
const pagination = require('../utils/pagination')
  
/* Get Products */
categoryRouter.post('/', async (req, res) => {
    const { pageIndex, pageSize, query } = req.body
    try {
        let [categories, total] = await Promise.all([
            Category.find({}), // Fetch all categories
            Category.countDocuments({}) // Count total number of products
        ]);

        if (query) {
            filteredData = pagination.wildCardSearch(categories, query, 'name'); // Assuming 'name' is the field you want to search on
            total = filteredData.length;
            categories = pagination.paginate(filteredData, pageSize, pageIndex); // Paginate the filtered data
        } else {
            categories = pagination.paginate(categories, pageSize, pageIndex); // Paginate all artists if no query
        }
        res.json({
            data: categories,
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

categoryRouter.get('/all', async (req, res) => {
    try {
        const categories = await Category.find({})
        res.json(categories)
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
})


categoryRouter.get('/:id', (req, res) => {
    const id = req.params.id
    Category.findById(id).then(category => {
        res.json(category)
    }).catch(error => {
        res.json({
            message: `The Category Doesn't Exist`
        })
    })
})


categoryRouter.post('/save',uploadCategory.single('img') , async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req, res), config.JWTSECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }
    const {id, name, img} = req.body;

    const uploadedImage = req?.file?.filename

    if (id) {
        // Update existing artwork
        const imgNotUpdated = typeof img === 'string'

        const categoryImage = imgNotUpdated ? img : uploadedImage

        Category.findByIdAndUpdate(id, {
            name, img: categoryImage
        }, { new: true })
            .then(updatedCategory => {
                if (!updatedCategory) {
                    return res.status(404).json({ error: 'Category not found' });
                }
                logger.info('Category updated');
                res.json(updatedCategory);
            })
            .catch(err => {
                logger.error('Error Updating Category:', err);
                res.status(500).json({ error: 'Internal server error' });
            });
    } else {
        // Create new artwork
        const newCategory = new Category({
            name,
            img:uploadedImage
        });

        newCategory.save()
            .then(response => {
                logger.info('New Category Saved');
                res.json(response);
            })
            .catch(err => {
                logger.error('Error saving new Category:', err);
                res.status(500).json({ error: 'Internal server error' });
            });
    }

})


categoryRouter.delete('/delete', verifyTokenMiddleware, async (req, res) => {
    const { id } = req.body
    try {
        const result = await Category.deleteOne({ _id: id }); // Assuming _id is the correct field
        if (result.deletedCount === 0) {
            return res.status(404).send('No Category found with that ID');
        }
        res.send('Category deleted successfully');
    } catch (error) {
        logger.error("Error deleting category: ", error); // Example of logging the error
        res.status(500).send(error.message);
    }
});

module.exports = categoryRouter 