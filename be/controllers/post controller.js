import { response } from "express";
import { postModel } from "../models/post_model.js";

export const postController = {
  getPosts: (req, res) => {
    postModel.getPosts().then((response) => {
      res.json(response);
    });
  },

  createPost: (req, res) => {
    let page = req.body;
    postModel.getPosts().then(async (response) => {
      let datas = response;
      if (await postModel.createPost(page)) {
        res.status(200).json({ message: "게시글 등록 완료" });
      } else {
        res.status(500).json({ message: "게시글 등록 실패" });
      }
    });
  },
  deletePost: async (req,res) => {
    const id = req.params.id;
    if (await postModel.deletePost(res,id)) {
      res.status(200).json({ message: "게시물 삭제 완료" });
    } else {
      res.status(500).json({ message: "게시물 삭제 실패" });
    }
  },
  modifyPost:async (req,res)=> {
    // const id = req.params.id;
    let req_post = req.body;
    if (await postModel.modifyPost(res,req_post)) {
      res.status(200).json({ message: "게시물 수정 완료" });
    } else {
      res.status(500).json({ message: "게시물 수정 실패" });
    }
  },
  writeComment: async (req, res) => {
    let req_comment = req.body;

    if (await postModel.writeComment(req_comment)) {
      res.status(200).json({ message: "댓글 등록 완료" });
    } else {
      res.status(500).json({ message: "댓글 등록 실패" });
    }
  },
  modifyComment: async (req, res) => {
    let req_comment = req.body;

    if (await postModel.modifyComment(res, req_comment)) {
      res.status(200).json({ message: "댓글 수정 완료" });
    } else {
      res.status(500).json({ message: "댓글 수정 실패" });
    }
  },
  deleteComment: async (req,res) => {
    const id = req.params.id;
    const commentid = req.params.commentid;
    if (await postModel.deleteComment(res,id,commentid)) {
      res.status(200).json({ message: "댓글 삭제 완료" });
    } else {
      res.status(500).json({ message: "댓글 삭제 실패" });
    }
  }
};

// export async function getPosts(){
//     return await postModel.getPosts();
// }