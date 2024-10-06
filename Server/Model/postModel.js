const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      default: "uncategorized",
    },
    imageUrl: {
      type: String,
      default:
        "https://science.nasa.gov/wp-content/uploads/2023/04/heic1916a-jpg.webp?w=4096&format=png",
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("post", postSchema);
module.exports = Post;
