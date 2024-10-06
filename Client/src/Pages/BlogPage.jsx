import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BlogPage() {
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState({});
  const [myStateVisible, setMyStateVisible] = useState();
  const myRef = useRef();
  const { slug } = useParams();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setMyStateVisible(entry.isIntersecting);
      console.log("entry", entry);
    });
    observer.observe(myRef.current);
  }, []);
  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/post/get-post/${slug}`);
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
  console.log(postData.imageUrl);

  return (
    <>
      <section ref={myRef} className="relative  w-full">
        <div className={`w-full h-screen bg-center bg-slate-300`}>
          <img
            src={postData.imageUrl}
            className="w-full h-full max-w-8xl max-h-6xl"
          />
        </div>

        <div className="absolute top-1/2 -translate-y-1/3 mx-7 max-w-3xl">
          <h1 className="font-bold  text-5xl sm:text-8xl text-white">
            {postData.title}
          </h1>
          <p className="text-md mt-3 text-gray-300">{postData.description}</p>
        </div>
      </section>
      <section className="max-w-6xl mx-auto p-5">
        <h1 className="text-6xl font-bold text-gray-950 mt-7">Overview</h1>
        <div
          className="p-3 max-w-7xl mx-auto w-full text-gray-800 text-xl"
          dangerouslySetInnerHTML={{ __html: postData && postData.content }}
        ></div>
      </section>
      <section>
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
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default BlogPage;
