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

/*
// 개별 게시물 보기 페이지 라우팅
app.get('/post/:id', (req, res) => {
  const postId = req.params.id;
  res.sendFile(path.join(__dirname, 'public', 'post.html')); // 게시물 보기 페이지 파일을 전송
});*/


app.get('/editpost/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'editpost.html'));
});

app.get('/editpassword', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'edit password.html'));
});

app.get('/editprofile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'edit profile.html'));
});

app.get('/postnew', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'post new.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
