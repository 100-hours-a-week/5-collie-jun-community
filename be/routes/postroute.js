
const express = require('express');
const path = require('path');
const router = express.Router();
const controller = require(path.join(__dirname, '..', 'controllers', 'postcontroller.js'));

router.get('/posts', controller.getAllPosts);

module.exports = router;