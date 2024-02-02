const logger = require('../utils/logger')
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersRouter = require('express').Router()
const config = require('../utils/config')

usersRouter.post('/signup', async (req, res) => {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        hashedPassword
    })

    
    user.save().then((response) => {
        logger.info('User Created Successfully')
        const retDoc = response._doc
        const userForToken = {
            username: user.username,
            id: user._id,
        }
        const token = jwt.sign(userForToken, config.JWTSECRET);
        res.status(201).json({username:retDoc.username, token:token})
        
    })
        .catch((err) => {
            logger.info('User Not Created')
            logger.info(err)
            res.status(500).json(err)
        })
})

usersRouter.post('/login', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.hashedPassword)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, config.JWTSECRET)

    response
        .status(200)
        .json({ token, username: user.username })
})

module.exports = usersRouter