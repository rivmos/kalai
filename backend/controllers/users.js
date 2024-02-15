const logger = require('../utils/logger')
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersRouter = require('express').Router()
const config = require('../utils/config')
const BlacklistedToken = require('../models/blacklistedToken');

usersRouter.post('/sign-up', async (req, res) => {
    const { username, password, email } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        hashedPassword,
        email
    })


    user.save().then((response) => {
        logger.info('User Created Successfully')
        const retDoc = response._doc
        const userForToken = {
            username: user.username,
            id: user._id,
        }
        const token = jwt.sign(userForToken, config.JWTSECRET);
        res.status(201).json({
            token, user: {
                avatar: retDoc.avatar,
                userName: retDoc.username,
                authority: [],
                email: retDoc.email,
            }
        })

    })
        .catch((err) => {
            logger.info('User Not Created')
            logger.info(err)
            res.status(500).json(err)
        })
})

usersRouter.post('/sign-in', async (request, response) => {
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
        .json({
            token, user: {
                avatar: user.avatar,
                userName: user.username,
                authority: [],
                email: user.email,
            }
        })
})


usersRouter.post('/logout', async (req, res) => {
    const { token } = req.body; // Assume the client sends the token to blacklist
    const decoded = jwt.verify(token, config.JWTSECRET);
    const expiryDate = new Date(); // Convert exp to milliseconds

    const blacklistedToken = new BlacklistedToken({
        token,
        expiryDate,
    });

    await blacklistedToken.save();

    res.status(204).end(); // No content to send back
});


module.exports = usersRouter