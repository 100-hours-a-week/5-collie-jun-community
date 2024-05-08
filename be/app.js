const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser"); // 쿠키 파서 추가

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // 쿠키 파서 미들웨어 사용

const userRoutes = require("./routes/userroute");
const postRoutes = require("./routes/postroute");

const port = 8081;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
//app.use(cors());
app.use("/users", userRoutes);
app.use("/", userRoutes);
app.use("/post", postRoutes);
app.use("/uploads", express.static("uploads")); // 밖에서 uploads 폴더 접근하게 하기

// 로그인 미들웨어 추가
app.use((req, res, next) => {
  // 쿠키에서 loggedInUser를 읽어옴
  const loggedInUser = req.cookies.loggedInUser;
  // 만약 쿠키에 loggedInUser가 존재한다면, 요청 객체에 user라는 속성을 추가하여 다음 미들웨어로 전달
  if (loggedInUser) {
    req.user = { username: loggedInUser };
  }
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
