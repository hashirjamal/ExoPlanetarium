import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { v4 as uuidv4 } from "uuid";
import PostCard from "./PostCard";
import axios from "axios";
import styles from "./BlogPosts.module.css";

function DashPosts() {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllPosts = async () => {
      try {
        setLoading(true);
        const posts = await axios.get(
          "http://localhost:3000/api/post/get-all-posts"
        );
        setLoading(false);
        setAllPosts(posts.data.posts);
      } catch (err) {
        console.log(err.message);
      }
    };
    getAllPosts();
  }, []);
  return loading ? (
    <div className="w-full mx-auto my-10 flex justify-center items-center h-screen">
      <CircularProgress size="50px" className="" />
    </div>
  ) : (
    <>
      <div className={styles.blogPost}>
        <h1
          className={`text-center sm:text-8xl font-bold  text-4xl text-gray-100 py-5 ${styles.articleHeading}`}
        >
          Articles
        </h1>
        <div className="flex flex-wrap gap-4 justify-center items-center p-5">
          {allPosts &&
            allPosts.map((post) => <PostCard key={uuidv4()} post={post} />)}
        </div>
      </div>
    </>
  );
}

export default DashPosts;
