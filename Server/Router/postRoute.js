const express = require("express");
const postRouter = express.Router();
const postController = require("../Controller/postController");

postRouter.route("/create-post").post(postController.createPost);
postRouter.route("/get-post/:slug").get(postController.getPost);

module.exports = postRouter;
