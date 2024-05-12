// routes/userroute.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usercontroller');

// 사용자 인증이 필요한 경로에 대한 미들웨어 추가
router.post('/check-nickname', controller.checkNickname); // 닉네임 중복 확인
router.post('/check-email', controller.checkEmail); // 이메일 중복 확인
router.post('/login', controller.login); // 로그인 요청 처리
router.post('/register', controller.register); // 회원가입
router.post('/logout', controller.logout); // 로그아웃

// 인증이 필요한 프로필 정보
router.get('/profile', controller.isAuthenticated, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
