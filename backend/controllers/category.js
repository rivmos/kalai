const categoryRouter = require('express').Router()
const Category = require('../models/category')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const getTokenFrom = require('../utils/auth').getTokenFrom
const config = require('../utils/config')
const {upload} = require('../utils/middleware')
  
/* Get Products */
categoryRouter.get('/', (req, res) => {
    Category.find({}).then((category) => {
        res.json(category) 
    }).catch(error => res.json(error))
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