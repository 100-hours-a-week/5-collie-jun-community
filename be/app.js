const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});