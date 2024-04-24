const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login new.html'));
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signin new.html'));
});

app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.get('/makepost', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'makepost.html'));
});

// 개별 게시물 보기 페이지 라우팅d
app.get('/post/:id', (req, res) => {
  const postId = req.params.id;
  res.sendFile(path.join(__dirname, 'public', 'post.html'));
});

app.get('/editpost', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'editpost.html'));
});

app.get('/editpassword', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'edit password.html'));
});

app.get('/editprofile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'edit profile.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//로그인 페이지: http://localhost:3000/login
//가입 페이지: http://localhost:3000/signin
//메인 페이지: http://localhost:3000/main
//게시물 작성 페이지: http://localhost:3000/makepost
//게시물 보기 페이지: http://localhost:3000/post
//게시물 수정 페이지: http://localhost:3000/editpost
//비밀번호 수정 페이지: http://localhost:3000/editpassword
//프로필 수정 페이지: http://localhost:3000/editprofile
