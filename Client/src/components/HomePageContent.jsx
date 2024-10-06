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
  }, []);

  return (
    <div className="p-4 md:p-10 w-full bg-black">
      {HomePageContent.map((item, index) => (
        <div
          className="my-10 md:my-[-250px] h-auto md:h-[125vh] pl-4 md:pl-24  max-sm:my-[120px]"
          key={index}
        >
          <div
            data-aos="fade-up"
            className="flex flex-col md:flex-row bg-slate-900 text-white p-4 md:p-10 rounded-2xl opacity-90 gap-4 md:gap-40 w-full md:w-[80vw] h-auto shadow-slate-50 drop-shadow-xl"
            style={{
              flexDirection: index % 2 === 0 ? "row" : "row-reverse",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            <img
              src={item.image}
              alt={item.heading}
              className="w-32 h-32 md:w-52 md:h-52 object-cover transition-transform rounded-full border-black hover:scale-110 cursor-pointer"
            />
            <div
              className="flex flex-col h-auto gap-4 md:gap-8"
              style={{
                marginLeft: index % 2 === 0 ? "20px" : "0",
                marginRight: index % 2 !== 0 ? "20px" : "0",
              }}
            >
              <h2
                data-aos="zoom-in"
                className="font-bold text-xl md:text-4xl"
              >
                {item.heading}
              </h2>
              <p
                data-aos="zoom-in"
                className={`text-sm md:text-xl font-medium ${style.paraFont} tracking-wider`}
              >
                {item.content}
              </p>
              <button
                className="bg-black w-28 md:w-40 p-2 rounded-2xl"
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
