const fs = require("fs");

// JSON 파일 경로
const jsonFilePath =
  "/Users/jeon-yeonju/Desktop/expressjs/5-collie-jun-community/be/model/postdata.JSON";

// 모든 포스트를 가져오는 함수
const getAllPosts = async (req, res) => {
    try {
        const posts = await fetchPosts();
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

  ////나중에 지울 내용////

// 메인 포스트를 가져오는 함수
const fetchPosts = async () => {
    return new Promise((resolve, reject) => {
        fs.readFile(jsonFilePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

// 외부에서 사용할 수 있도록 모듈로 내보냅니다.
module.exports = {
    getAllPosts,
};
