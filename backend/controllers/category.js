const categoryRouter = require('express').Router()
const Category = require('../models/category')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const getTokenFrom = require('../utils/auth').getTokenFrom
const config = require('../utils/config')
const {upload} = require('../utils/middleware')
  
/* Get Products */
categoryRouter.get('/', async (req, res) => {
    try{
        const [categories, total] = await Promise.all([
            Category.find({}), // Fetch all categories
            Category.countDocuments({}) // Count total number of products
          ]);
        res.json({
            data:categories,
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


categoryRouter.post('/save', async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req, res), config.JWTSECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }
    const {name} = req.body;
    const newCategory = new Category({
        name
    })
    newCategory.save()
        .then((response) => {
            logger.info('Category saved')
            res.json(response)
        })
        .catch((err) => {
            logger.info('Category not saved')
            logger.info(err)
            res.status(500).json(err)
        })
})


module.exports = categoryRouter 