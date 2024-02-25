const Artwork = require('../models/artwork')
const Artist = require('../models/artist')
const Category = require('../models/category')
const Enquiry = require('../models/enquiry')

const dashboardRouter = require('express').Router()

dashboardRouter.get('/', async (req, res) => {
    try {
        const [totalArtists, totalArtworks, totalCategories, totalEnquiries] = await Promise.all([
            Artist.countDocuments({}),
            Artwork.countDocuments({}),
            Category.countDocuments({}),
            Enquiry.countDocuments({})
        ])

        res.json([
            { "name": "Artists", "value": totalArtists },
            { "name": "Artworks", "value": totalArtworks },
            { "name": "Categories", "value": totalCategories },
            { "name": "Enquiries", "value": totalEnquiries }
        ]);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
})

module.exports = dashboardRouter