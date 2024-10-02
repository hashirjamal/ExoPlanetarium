import React from "react";

function BlogsPost() {
  return (
    <div>
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
    </div>
  );
}

export default BlogsPost;
