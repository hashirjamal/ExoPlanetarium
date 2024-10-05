import React from "react";

const HomeVideo = () => {
  return (
    <div className="w-full relative">
      <video className="w-full backdrop-opacity-0 " autoPlay muted loop>
        <source src="../../videos/Exoplanetarium.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HomeVideo;
