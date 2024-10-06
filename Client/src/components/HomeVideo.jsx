import React from "react";
import style from "../Pages/Home/Home.module.css"; 

const HomeVideo = () => {
  return (
    <div className={`w-full relative ${style.videoContainer}`}>
      <video className={`w-full h-auto ${style.video}`} autoPlay muted loop>
        <source src="../../videos/Exoplanetarium.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default HomeVideo; 
