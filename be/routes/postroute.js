
const express = require('express');
const path = require('path');
const router = express.Router();
const controller = require(path.join(__dirname, '..', 'controllers', 'postcontroller.js'));

router.post('/main', controller.getMainPosts);

module.exports = router;