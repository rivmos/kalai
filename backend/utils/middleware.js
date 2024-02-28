const logger = require('./logger')
const multer = require('multer')
const path = require('path');

// Logger

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

//Unknown Endpoint Route

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Multer Upload Object

const artworkStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '/uploads/artwork'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const categoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '/uploads/category'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '/uploads/avatar'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const uploadArtwork = multer({ storage: artworkStorage });
const uploadCategory = multer({ storage: categoryStorage });
const uploadAvatar = multer({ storage: avatarStorage });

module.exports = {
  requestLogger,
  unknownEndpoint,
  uploadArtwork,
  uploadCategory,
  uploadAvatar
}