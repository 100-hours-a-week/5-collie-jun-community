const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require("./routes/userroute");
const postRoutes = require("./routes/postroute")

const port = 8081;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
//app.use(cors());
app.use("/users", userRoutes); // userRoutes를 사용합니다.
app.use("/", userRoutes);
app.use("/post",postRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

