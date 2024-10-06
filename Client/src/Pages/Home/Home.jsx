import React from "react";
import HomeVideo from "../../components/HomeVideo";
import style from "./Home.module.css";
import HomePageContentComponent from "../../components/HomePageContent";
import Footer from "../../components/Footer.jsx";
import MoonwithEarth from "../../components/MoonwithEarth.jsx";

const Home = () => {
  return (
    <>
      <main className={`bg-black ${style.homeDiv}`} style={{ minHeight: '100vh' }}>
        <div className="absolute text-white p-12 z-20 text-center w-full flex flex-col gap-10 sm:my-3 md:gap-20 my-12 md:my-40 shadow-xl ">
          <h1 className="tracking-widest text-shadow font-semibold text-3xl md:text-5xl ">
            Welcome to ExoPlanetarium
          </h1>
          <p className="tracking-widest text-shadow font-medium text-xl md:text-4xl">
            A place to learn about exoplanets and test your knowledge with our quiz
          </p>
        </div>
        <HomeVideo />
        <HomePageContentComponent />
      </main>
      <MoonwithEarth />
      <Footer />
    </>
  );
};

export default Home;
