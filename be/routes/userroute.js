const express = require('express');
const path = require('path');
const router = express.Router();
const controller = require(path.join(__dirname, '..', 'controllers', 'usercontroller.js'));

router.post('/check-nickname', controller.checkNickname);
router.post('/login',controller.login);//로그인 요청 처리

module.exports = router;
