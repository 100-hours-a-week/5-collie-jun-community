const express = require('express');
const path = require('path');
const router = express.Router();
const controller = require(path.join(__dirname, '..', 'controllers', 'usercontroller.js'));

router.post('/check-nickname', controller.checkNickname);//닉네임 중복 확인
router.post('/check-email', controller.checkEmail);//닉네임 중복 확인
router.post('/login',controller.login);//로그인 요청 처리
router.post('/register',controller.register);//회원가입

module.exports = router;
