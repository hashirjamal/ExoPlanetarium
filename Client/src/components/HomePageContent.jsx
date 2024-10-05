import { HomePageContent } from "../utils/constants";
import style from "../Pages/Home/Home.module.css";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const HomePageContentComponent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className="p-10 w-full bg-black">
      {HomePageContent.map((item, index) => (
        <div className="my-[-250px] h-[125vh] pl-24" key={index}>
          <div
            data-aos="fade-up"
            className="flex flex-row md:flex-row bg-slate-900 text-white p-10 rounded-2xl opacity-90 gap-40 w-[80vw] h-96 shadow-slate-50 drop-shadow-xl"
            style={{
              display: "flex",
              flexDirection: index % 2 === 0 ? "row" : "row-reverse",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            <img
              src={item.image}
              alt={item.heading}
              style={{ width: "200px", height: "200px", objectFit: "cover", transition: "transform 0.3s" }}
              className="rounded-full border-black hover:transform hover:scale-110 cursor-pointer"
            />
            <div
              style={{
                marginLeft: index % 2 === 0 ? "20px" : "0",
                marginRight: index % 2 !== 0 ? "20px" : "0",
              }}
              className="flex flex-col h-40 gap-8"
            >
              <h2 data-aos="zoom-in" className="font-bold text-4xl">{item.heading}</h2>
              <p data-aos="zoom-in" className={`text-xl font-medium ${style.paraFont} tracking-wider`}>{item.content}</p>
              <button
                className="bg-black w-40 p-2 rounded-2xl"
                onClick={() => navigate(item.links)}
              >
                {item.button}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePageContentComponent;
