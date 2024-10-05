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
        <div className="absolute text-white p-10 z-20 text-center w-full text-5xl flex flex-col gap-20 my-24 shadow-xl">
          <h1 className="tracking-widest text-shadow font-semibold">
            Welcome to ExoPlanetarium
          </h1>
          <p className="tracking-widest text-shadow font-medium text-4xl">
            A place to learn about exoplanets and test your knowledge with our
            quiz
          </p>
        </div>
        <HomeVideo />
        <HomePageContentComponent />
      </main>
      <MoonwithEarth/>
      <Footer />
    </>
  );
};

export default Home;
