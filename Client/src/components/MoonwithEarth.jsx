import React from "react";
import moonWithEarthImage from "../../public/moon.jpg";
import style from "../Pages/Home/Home.module.css";

const MoonwithEarth = () => {
    return (
        <div className="relative">
            <img src={moonWithEarthImage} className="w-full h-[90vh] object-cover" alt="Moon with Earth" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
            <div className={` ${style.para} absolute text-slate-100 z-10 bottom-10 text-center w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-32 text-lg md:text-2xl cursor-pointer`}>
                <p>KNOWLEDGE</p>
                <p>EXCELLENCE</p>
                <p>CREATIVITY</p>
            </div>
        </div>
    );
};

export default MoonwithEarth;