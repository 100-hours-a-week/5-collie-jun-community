const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// 세션 설정
app.use(session({
  secret: 'your_secret_key', // 세션을 암호화하기 위한 키
  resave: false,              // 세션을 항상 저장할 지 여부
  saveUninitialized: true,    // 초기화되지 않은 세션을 스토어에 강제로 저장
  cookie: {
    httpOnly: true,           // 클라이언트 JavaScript가 아닌 HTTP(S)를 통해서만 접근 가능
    secure: false,            // HTTPS를 통해서만 쿠키가 전송되도록
    maxAge: 1000 * 60 * 60    // 쿠키의 유효 시간 (여기서는 1시간)
  }
}));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

const userRoutes = require("./routes/userroute");
const postRoutes = require("./routes/postroute");

app.use("/users", userRoutes);
app.use("/", userRoutes);
app.use("/post", postRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(8081, () => {
  console.log(`Server is running on port 8081`);
});
