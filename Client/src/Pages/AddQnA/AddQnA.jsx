import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SlActionUndo } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

export default function AddQnA() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleOptionChange = (optionNo, value) => {
    setOptions((p) => {
      let obj = {
        ...p,
      };
      obj[optionNo] = value;
      return obj;
    });
  };

  const handleClear = () => {
    setQuestion("");
    setOptions({
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    });
    setSelectedIndex(null);
  };

  const handleSubmit = async () => {
    const optionArray = Object.values(options);
    let obj = {
      question,
      options: optionArray,
      correctOption: optionArray[selectedIndex],
    };
    if (
      Object.values(obj).some(
        (value) =>
          value === "" || (Array.isArray(value) && value.some((v) => v === ""))
      )
    ) {
      return toast.error("Please fill all the fields");
    }
    if (selectedIndex === null) {
      return toast.error("Please select the correct option");
    }
    console.log(obj);
    const response = await axios.post(
      "http://localhost:3000/quiz/addQuestion",
      obj
    );
    if (response.status === 201) {
      toast.success("Question added successfully");
      handleClear();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="bg-[#0c0b0b] mt-[5rem] min-h-[100vh] text-white flex flex-col 
    items-center "
    >
      <div className="self-start ml-[15vw] max-sm:ml-4">
        <button
          className="py-2 px-4 rounded-lg flex items-center justify-center gap-1 mt-6 w-20 bg-gray-800 hover:bg-gray-700"
          onClick={() => navigate("/add-quiz")}
        >
          <SlActionUndo /> Back
        </button>
      </div>
      {/* question box */}
      <h2 className=" text-4xl text-center mt-6">Add Questions for quiz</h2>
      <div className="px-6 w-full sm:w-9/12 py-10">
        <nav className="flex items-centers">
          <p className="py-3 font-semibold">Q.</p>
          <input
            type="text "
            placeholder="Enter your Question here"
            className="p-2"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </nav>

        <p className="font-light text-gray-400 pt-6">
          Note: Checkmark the option which is correct
        </p>

        <div className="flex flex-wrap my-3">
          <nav className="flex w-1/2 gap-6  items-center ">
            <input
              type="radio"
              name="ans"
              id=""
              className="w-1/12 h-6"
              onChange={() => setSelectedIndex(0)}
            />
            <input
              type="text"
              className="w-1/2 outline-white border-white"
              placeholder="Option 1"
              value={options.option1}
              onChange={(e) => handleOptionChange("option1", e.target.value)}
            />
          </nav>

          <nav className="flex w-1/2 gap-6  items-center">
            <input
              type="radio"
              name="ans"
              id=""
              className="w-1/12 h-6"
              onChange={() => setSelectedIndex(1)}
            />
            <input
              type="text"
              className="w-1/2  outline-white border-white"
              placeholder="Option 2"
              value={options.option2}
              onChange={(e) => handleOptionChange("option2", e.target.value)}
            />
          </nav>
        </div>

        <div className="flex flex-wrap">
          <nav className="flex w-1/2 gap-6  items-center ">
            <input
              type="radio"
              name="ans"
              id=""
              className="w-1/12 h-6"
              onChange={() => setSelectedIndex(2)}
            />
            <input
              type="text"
              className="w-1/2  outline-white border-white"
              placeholder="Option 3"
              value={options.option3}
              onChange={(e) => handleOptionChange("option3", e.target.value)}
            />
          </nav>

          <nav className="flex w-1/2 gap-6  items-center">
            <input
              type="radio"
              name="ans"
              id=""
              className="w-1/12 h-6"
              onChange={() => setSelectedIndex(3)}
            />
            <input
              type="text"
              className="w-1/2  outline-white border-white"
              placeholder="Option 4"
              value={options.option4}
              onChange={(e) => handleOptionChange("option4", e.target.value)}
            />
          </nav>

          <div className="my-8">
            <button
              className="py-2 px-4  rounded-lg mt-6 w-20 bg-gray-800 hover:bg-gray-700"
              onClick={handleSubmit}
            >
              Add
            </button>
            <button
              className="py-2 px-4  rounded-lg mt-6 w-20 ml-4 bg-gray-800 hover:bg-gray-700"
              onClick={handleClear}
            >
              Clear
            </button>
            <ToastContainer theme="dark" />
          </div>
        </div>
      </div>
    </div>
  );
}
