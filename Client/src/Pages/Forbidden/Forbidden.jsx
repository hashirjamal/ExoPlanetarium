import React, { useContext } from "react";
import HomeVideo from "../../components/HomeVideo";
import style from "./Forbidden.module.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../store/userContext";

const Forbidden = () => {
    const { user } = useContext(UserContext);
    return (
        <>
            <main
                className={`bg-black ${style.homeDiv}`}
                style={{ minHeight: "100vh" }}
            >
                <div className="absolute text-white p-12 z-20 text-center w-full flex flex-col gap-10 sm:my-3 md:gap-20 my-12 md:my-40 shadow-xl ">
                    <h1 className="tracking-widest text-shadow font-semibold text-3xl md:text-5xl ">
                        403 - Forbidden
                    </h1>
                    <p className="tracking-widest text-shadow font-medium text-xl md:text-4xl">
                        You do not have permission to access this page
                    </p>
                    {user && (
                        <p className="text-shadow font-light text-lg md:text-2xl mt-4">
                            Please go back to the{" "}
                            <Link
                                to="/home"
                                className="text-blue-500 hover:underline"
                            >
                                homepage
                            </Link>
                            .
                        </p>
                    )}
                    {!user && (
                        <p className="text-shadow font-light text-lg md:text-2xl mt-4">
                            Go back to the{" "}
                            <Link
                                to="/"
                                className="text-blue-500 hover:underline"
                            >
                                Login
                            </Link>
                            .
                        </p>
                    )}
                </div>
                <HomeVideo />
            </main>
        </>
    );
};

export default Forbidden;
