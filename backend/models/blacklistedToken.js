// models/blacklistedToken.js
const mongoose = require('mongoose');

const blacklistedTokenSchema = new mongoose.Schema({
    token: String,
    expiryDate: Date,
});

module.exports = mongoose.model('BlacklistedToken', blacklistedTokenSchema);