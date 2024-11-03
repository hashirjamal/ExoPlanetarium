import React from "react";
import { Link } from "react-router-dom";
function PostCard({ post }) {
  return (
    <div className="group border border-blue-600 rounded-lg sm:w-[380px] h-[360px] hover:border-2 overflow-hidden transition-all w-full">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.imageUrl}
          alt={post.imageUrl}
          className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20 line-clamp-2"
          loading="lazy"
        />
      </Link>
      <div className="flex justify-center flex-col relative gap-1 m-3">
        <h3 className="text-lg font-bold line-clamp-1 text-gray-200 ">
          {post.title}
        </h3>
        <span className="text-sm mb-2 italic text-gray-200">
          {post.category}
        </span>
        <Link
          to={`/post/${post.slug}`}
          className="group-hover:-bottom-[40px] bottom-[-300px] z-10 absolute transition-all duration-200 left-0 right-0 py-2 rounded-md border border-blue-600 text-center hover:bg-blue-600 text-md font-semibold hover:text-gray-200 text-gray-200"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
