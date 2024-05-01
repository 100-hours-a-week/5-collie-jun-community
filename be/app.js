// express 모듈을 불러옵니다.
const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

app.use('/posts', router);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  