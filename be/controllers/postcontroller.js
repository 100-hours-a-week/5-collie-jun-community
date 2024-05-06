const fs = require("fs");
const path = require("path");

// JSON 파일 경로
const jsonFilePath = path.join(__dirname, "..", "model", "postdata.json");

// 모든 포스트를 가져오는 함수
const getAllPosts = async (req, res) => {
  try {
    const posts = await fetchPosts();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 메인 포스트를 가져오는 함수
const fetchPosts = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const submitPost = async (req, res) => {
  try {
    // 클라이언트에서 받은 JSON 형식의 데이터
    const { title, content } = req.body;
    const { filename } = req.file;

    // 새로운 포스트 객체 생성
    const newPost = {
      id: 7,
      title: title,
      content: content,
      timestamp: new Date().toISOString(),
      post_image: `http://localhost:8081/uploads/${filename}`,
      comments: 0,
      likes: 0,
      views: 0,
      profile_image: `https://randomuser.me/api/portraits/men/4.jpg`,
      nickname: "더미7"
    };

    // 기존 포스트들을 가져옴
    const posts = await fetchPosts();

    // 새로운 포스트를 추가하고 JSON 파일에 저장
    posts.push(newPost);
    fs.writeFile(
      jsonFilePath,
      JSON.stringify(posts, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.json({ message: "게시물이 성공적으로 작성되었습니다.", newPost }); // 추가된 포스트 정보를 클라이언트에 전송
        }
      }
    );
  } catch (error) {
    console.error("Error submitting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePost = async (req, res) => {
    try {
        const postId = req.params.postId; // 요청에서 postId 추출
        const updatedPostData = req.body; // 요청에서 업데이트된 데이터 추출

        const result = await updatePostInJSON(postId, updatedPostData); // JSON 파일 업데이트 함수 호출

        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(404).json({ error: result.message });
        }
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updatePostInJSON = async (postId, updatedPostData) => {
    try {
        // JSON 파일에서 업데이트할 데이터 가져오기
        const data = await fs.promises.readFile(jsonFilePath, "utf-8");
        const posts = JSON.parse(data);

        // 해당 postId와 일치하는 게시글 찾기
        const postIndex = posts.findIndex(post => post.id === parseInt(postId));

        // 해당 postId가 존재하는 경우
        if (postIndex !== -1) {
            // 해당 게시글 업데이트
            posts[postIndex] = { ...posts[postIndex], ...updatedPostData };

            // 업데이트된 데이터 JSON 파일에 쓰기
            await fs.promises.writeFile(jsonFilePath, JSON.stringify(posts, null, 2), "utf-8");

            return { success: true, message: "게시글이 성공적으로 수정되었습니다." };
        } else {
            return { success: false, message: "해당 ID를 가진 게시글을 찾을 수 없습니다." };
        }
    } catch (error) {
        console.error("Error updating post in JSON file:", error);
        return { success: false, message: "게시글 수정 중 오류가 발생했습니다." };
    }
};

//삭제
const deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;

        // JSON 파일 읽기
        const data = await fs.promises.readFile(jsonFilePath, "utf-8");
        let posts = JSON.parse(data);

        // postId와 일치하는 게시글 찾기
        const postIndex = posts.findIndex(post => post.id == postId);

        // 해당 postId가 존재하는 경우
        if (postIndex !== -1) {
            // 해당 게시글 삭제
            posts.splice(postIndex, 1);

            // 업데이트된 데이터 JSON 파일에 쓰기
            await fs.promises.writeFile(jsonFilePath, JSON.stringify(posts, null, 2), "utf-8");

            res.json({ success: true, message: "게시물이 성공적으로 삭제되었습니다." });
        } else {
            res.status(404).json({ success: false, message: "해당 ID를 가진 게시글을 찾을 수 없습니다." });
        }
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ success: false, message: "게시물 삭제 중 오류가 발생했습니다." });
    }
};



// 외부에서 사용할 수 있도록 모듈로 내보냅니다.
module.exports = {
  getAllPosts,
  submitPost,
  updatePost,
  updatePostInJSON,
  deletePost,
};