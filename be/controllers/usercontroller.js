const fs = require("fs");

// JSON 파일 경로
const jsonFilePath =
  "/Users/jeon-yeonju/Desktop/expressjs/5-collie-jun-community/be/model/data.JSON";

//로그인 함수
const login = (req, res) => {
  const { enteredUsername, enteredPassword } = req.body;
  
  // 파일을 비동기적으로 읽어옴
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "서버 오류: 파일을 읽는 중 오류가 발생했습니다.",
      });
    }
    
    try {
      const userData = JSON.parse(data);
      const user = userData.users.find(user => user.email === enteredUsername);

      if (!user) {
        // 사용자가 존재하지 않는 경우
        return res.status(404).json({error: '등록되지 않은 이메일입니다.'});
      } else if (user.password !== enteredPassword) {
        // 비밀번호가 일치하지 않는 경우
        return res.status(401).json({error: '비밀번호가 다릅니다.'});
      } else {
        // 로그인 성공
        return res.status(200).json({message: '로그인했습니다.'});
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "서버 오류: JSON 데이터를 파싱하는 중 오류가 발생했습니다.",
      });
    }
  });
};

// 이메일 중복 확인 함수
const checkEmail = (req, res) => {
  const { email } = req.body;

  // 비동기 방식으로 파일 읽기
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "서버 오류: 파일을 읽는 중 오류가 발생했습니다.",
      });
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
      return res.status(500).json({
        error: "서버 오류: JSON 데이터를 파싱하는 중 오류가 발생했습니다.",
      });
    }
  });
};



// 닉네임 중복 확인 함수
const checkNickname = (req, res) => {
  const { nickname } = req.body;

  // 비동기 방식으로 파일 읽기
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "서버 오류: 파일을 읽는 중 오류가 발생했습니다.",
      });
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
      return res.status(500).json({
        error: "서버 오류: JSON 데이터를 파싱하는 중 오류가 발생했습니다.",
      });
    }
  });
};


// 회원가입 함수
const register = (req, res) => {
  const { email, password, nickname } = req.body;

  // 이미지 파일 받기
  const profilePic = req.file;

  // 비동기 방식으로 파일 읽기
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "서버 오류: 파일을 읽는 중 오류가 발생했습니다.",
      });
    }
    
    try {
      // JSON 파일의 데이터를 파싱
      const usersData = JSON.parse(data);

      // 사용자 정보 생성
      const newUser = {
        email: email,
        password: password,
        nickname: nickname,
        profilePic: profilePic ? profilePic.filename : null // 프로필 이미지 파일명 추가
      };

      // 사용자 데이터에 새로운 사용자 추가
      usersData.users.push(newUser);

      // 변경된 데이터를 JSON 형식으로 문자열화
      const updatedData = JSON.stringify(usersData, null, 2);

      // 파일에 새로운 데이터 쓰기
      fs.writeFile(jsonFilePath, updatedData, "utf8", (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            error: "서버 오류: 파일을 쓰는 중 오류가 발생했습니다.",
          });
        }
        
        // 회원가입 성공 응답
        return res.status(200).json({ message: "회원가입이 완료되었습니다." });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "서버 오류: JSON 데이터를 파싱하는 중 오류가 발생했습니다.",
      });
    }
  });
};

module.exports = {
  login,
  checkNickname,
  checkEmail,
  register
};
