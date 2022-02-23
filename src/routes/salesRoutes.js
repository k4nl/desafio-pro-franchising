const express = require('express');

const router = express.Router();

const salesControllers = require('../controllers/salesControllers');

router.post('/', salesControllers.register);

module.exports = router;