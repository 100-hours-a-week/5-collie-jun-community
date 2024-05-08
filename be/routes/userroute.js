const express = require('express');
const path = require('path');
const router = express.Router();
const controller = require(path.join(__dirname, '..', 'controllers', 'usercontroller.js'));
const isAuthenticated = require('../middleware/isAuthenticated'); // 사용자 인증 미들웨어 추가

// 사용자 인증이 필요한 경로에 대한 미들웨어 추가
router.post('/check-nickname', isAuthenticated, controller.checkNickname);//닉네임 중복 확인
router.post('/check-email', isAuthenticated, controller.checkEmail);//이메일 중복 확인
router.post('/login', controller.login);//로그인 요청 처리
router.post('/register', controller.register);//회원가입

module.exports = router;
