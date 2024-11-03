import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { useParams } from "react-router-dom";
import axios from "axios";

function BlogPage() {
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/post/get-post/${slug}`
        );
        setLoading(false);
        if (response.data) {
          setPostData(response.data.data);
        }
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchPostData();
  }, [slug]);

  return (
    <div>
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.9 }}
        className="relative  w-full"
      >
        <div className={`w-full h-screen bg-center bg-slate-300`}>
          <img src={postData.imageUrl} className="w-full h-full bg-cover" />
        </div>

        <div
          variants={fadeIn("left", 0)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.9 }}
          className="absolute top-1/2 -translate-y-1/3 mx-7 max-w-3xl"
        >
          <h1 className="font-bold  text-5xl sm:text-7xl text-white">
            {postData.title}
          </h1>
          <p className="text-md mt-3 text-gray-100">{postData.description}</p>
        </div>
      </motion.div>
      <motion.div
        variants={fadeIn("left", 0.1)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.1 }}
        className="p-5 py-14 flex justify-center flex-col bg-slate-300 overflow-hidden"
      >
        <h1 className="text-6xl font-bold text-gray-950 mt-7">Overview</h1>
        <div
          className="p-3 flex justify-center flex-col w-full text-gray-800 text-xl"
          dangerouslySetInnerHTML={{
            __html: postData && postData.content,
          }}
        ></div>
      </motion.div>

      <div className="h-auto bg-gray-200 flex lg:flex-row justify-center items-center flex-col gap-4 py-28">
        <div className="px-10">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900">
            Exoplanet Types
          </h1>
          <p className="text-lg my-8">
            So far scientists have categorized exoplanets into the following
            types: Gas giant, Neptunian, super-Earth and terrestrial with
            subcategories like mini-Neptunes within those groups.
          </p>
        </div>
        <div className="">
          <img
            className="object-cover w-full min-h-48"
            src="https://science.nasa.gov/wp-content/uploads/2023/06/1795-1585-what-is-exoplanet-banner-jpg.webp?w=1280&format=webp"
          />
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
