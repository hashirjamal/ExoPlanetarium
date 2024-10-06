const Post = require("./../Model/postModel");
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const CustomError = require("../Utils/CustomErrorHandler");
exports.createPost = asyncErrorHandler(async (req, res, next) => {
  if (!req.body.title || !req.body.description || !req.body.content) {
    return next(new CustomError("Please provide all required fields", 400));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^A-Za-z0-9-]/g, "");
  const newPost = {
    ...req.body,
    slug,
    userId: req.body.userId,
  };
  try {
    const post = await Post.create(newPost);
    res.status(201).json({
      status: "success",
      post,
    });
  } catch (err) {
    return next(new CustomError(err.message, 403));
  }
});

exports.getPost = asyncErrorHandler(async (req, res, next) => {
  const slug = req.params.slug;
  if (!slug) {
    return next(new CustomError("No post found", 404));
  }
  const post = await Post.findOne({ slug });
  if (!post) {
    return next(new CustomError("No post found", 404));
  }
  res.status(200).json({
    status: "success",
    data: post,
  });
});
exports.getAllPosts = asyncErrorHandler(async (req, res, next) => {
  const posts = await Post.find();
  if (posts.length === 0) {
    return next(new CustomError("No posts found", 404));
  }
  res.status(200).json({
    status: "success",
    posts,
  });
});
