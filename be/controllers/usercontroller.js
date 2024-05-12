// controllers/usercontroller.js

const fs = require("fs");
const path = require("path");
const jsonFilePath = path.join(__dirname, '..', 'model', 'data.JSON');

const login = (req, res) => {
  const { enteredUsername, enteredPassword } = req.body;

  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "서버 오류: 파일을 읽는 중 오류가 발생했습니다." });
    }

    try {
      const userData = JSON.parse(data);
      const user = userData.users.find(user => user.email === enteredUsername);

      if (!user) {
        return res.status(404).json({ error: '등록되지 않은 이메일입니다.' });
      } else if (user.password !== enteredPassword) {
        return res.status(401).json({ error: '비밀번호가 다릅니다.' });
      } else {
        // 로그인 성공, 세션에 사용자 정보 저장
        req.session.user = user.email;  // 세션에 user 이메일 저장
        return res.status(200).json({ message: '로그인했습니다.' });
      }
    } catch (error) {
      return res.status(500).json({ error: "서버 오류: JSON 데이터를 파싱하는 중 오류가 발생했습니다." });
    }
  });
};


// controllers/usercontroller.js
const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: "로그아웃 중 오류가 발생했습니다." });
    }
    res.status(200).json({ message: '로그아웃 되었습니다.' });
  });
};


// 이메일 중복 확인 함수
const checkEmail = (req, res) => {
  const { email } = req.body;

  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "서버 오류: 파일을 읽는 중 오류가 발생했습니다." });
    }

    try {
      const usersData = JSON.parse(data);
      if (usersData.users.some((item) => item.email === email)) {
        return res.json({ isDuplicate: true });
      } else {
        return res.json({ isDuplicate: false });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "서버 오류: JSON 데이터를 파싱하는 중 오류가 발생했습니다." });
    }
  });
};

// 닉네임 중복 확인 함수
const checkNickname = (req, res) => {
  const { nickname } = req.body;

  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "서버 오류: 파일을 읽는 중 오류가 발생했습니다." });
    }

    try {
      const nicknames = JSON.parse(data);
      if (nicknames.users.some((item) => item.nickname === nickname)) {
        return res.json({ isDuplicate: true });
      } else {
        return res.json({ isDuplicate: false });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "서버 오류: JSON 데이터를 파싱하는 중 오류가 발생했습니다." });
    }
  });
};

// 회원가입 함수
const register = (req, res) => {
  const { email, password, nickname } = req.body;

  const profilePic = req.file;

  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "서버 오류: 파일을 읽는 중 오류가 발생했습니다." });
    }

    try {
      const usersData = JSON.parse(data);

      const newUser = {
        email: email,
        password: password,
        nickname: nickname,
        profilePic: profilePic ? profilePic.filename : null
      };

      usersData.users.push(newUser);

      const updatedData = JSON.stringify(usersData, null, 2);

      fs.writeFile(jsonFilePath, updatedData, "utf8", (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "서버 오류: 파일을 쓰는 중 오류가 발생했습니다." });
        }

        return res.status(200).json({ message: "회원가입이 완료되었습니다." });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "서버 오류: JSON 데이터를 파싱하는 중 오류가 발생했습니다." });
    }
  });
};

// 인증 미들웨어
const isAuthenticated = (req, res, next) => {
  if (req.cookies.loggedInUser) {
    req.user = { email: req.cookies.loggedInUser };
    next();
  } else {
    return res.status(401).json({ error: "로그인이 필요합니다." });
  }
};

module.exports = {
  login,
  checkNickname,
  checkEmail,
  register,
  logout,
  isAuthenticated,
};
