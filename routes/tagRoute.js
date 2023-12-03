const express = require('express')
const router = express.Router()

const verifyJwt = require('../middleware/verifyJwt')

const controller = require('../controllers/tagController')

// router.get('/tags', controller.getTags)

router.post('/tags', [verifyJwt], controller.findOrCreateTag)

module.exports = router
