const logger = require('../utils/logger')
const enquiryRouter = require('express').Router()
const Enquiry = require('../models/enquiry')
const getTokenFrom = require('../utils/auth').getTokenFrom
const jwt = require('jsonwebtoken')

/* Get Enquiries */
enquiryRouter.get('/', (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req, res), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    Enquiry.find({}).then((products)=>{
        res.json(products)
    }).catch(error => res.json(error))
})


const validateEnquiry = (body) => {
    if (!body.name) {
        return 'Name'
    }
    else if (!body.email) {
        return 'Email'
    }
    else if (!body.mobile) {
        return 'Mobile'
    }
    else if (!body.product) {
        return 'Product'
    }
    else if (!body.message) {
        return 'Message'
    }
    else {
        return ''
    }
}

/* Post Enquiry */
enquiryRouter.post('/new', (req, res) => {
    const body = req.body;
    // enquiries = enquiries.concat(body)
    const validationError = validateEnquiry(body)
    if (validationError) {
        res.status(500).json({ message: `${validationError} Required` })
        return
    }
    const newEnquiry = new Enquiry(body)
    newEnquiry.save()
        .then((response) => {
            logger.info('enquiry saved')
            res.json(response)
        })
        .catch((err) => {
            logger.info('enquiry not saved')
            logger.info(err)
            res.status(500).json(err)
        })
})

/* Deleting Enquiry */
enquiryRouter.delete('/:id', (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req, res), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const id = req.params.id
    Enquiry.findByIdAndDelete(id).then(enquiry => {
        res.json(enquiry)
    }).catch(error => {
        res.json({
            message: `Error While Deleting Enquiry`
        })
    })
})


module.exports = enquiryRouter 