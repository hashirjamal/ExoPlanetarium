import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import axios from "axios";
import styles from "./DashPosts.module.css";

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
    <div className="w-full mx-auto my-10 flex justify-center">
      <CircularProgress size="50px" className="" />
    </div>
  ) : (
    <>
      <div className={styles.blogPost}>
        <h1 className="text-center sm:text-8xl font-bold  text-4xl dark:text-gray-200 py-5">
          Articles
        </h1>
        <div className="flex flex-wrap gap-4 justify-center items-center p-5">
          {allPosts.map((post) => (
            <Card key={uuidv4()} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default DashPosts;
