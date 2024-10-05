// import React, { useRef, useState } from "react";
// import { FloatingLabel, Button, Spinner, Alert } from "flowbite-react";
// import { MdEmail } from "react-icons/md";
// import { GoEyeClosed, GoEye } from "react-icons/go";
// import { FaGithub, FaUser } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { Link, useNavigate } from "react-router-dom";
// import { signUp } from "../../services/GlobalApi";
// import { toast } from "react-toastify";

// function SignUp() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const navigate = useNavigate();
//   const [inputData, setInputData] = useState({});
//   const showPasswordElement = useRef();
//   const showConfirmPasswordElement = useRef();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await signUp(inputData);
//       setLoading(false);
//       navigate("/sign-in");
//       toast.success("Sign Up Successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     } catch (err) {
//       setLoading(false);
//       setErrorMessage(err.response.data.message);
//     }
//   };
//   const handleChange = (e) => {
//     setErrorMessage(false);
//     setInputData({ ...inputData, [e.target.id]: e.target.value });
//   };
//   return (
//     <div className="flex items-center justify-center min-h-screen max-w-lg mx-auto p-7">
//       <div className="flex flex-col gap-3 border border-1 rounded-2xl w-full py-7 px-7 shadow-xl border-gray-400">
//         <h1 className="text-center text-3xl font-bold">Sign Up</h1>
//         <p className="text-md text-gray-400">
//           Create your professional resume in minutes - fast, easy, and
//           ATS-friendly!
//         </p>
//         <form className="flex flex-col gap-2 my-2" onSubmit={handleSubmit}>
//           <div className="relative">
//             <FloatingLabel
//               type="text"
//               variant="filled"
//               label="Your name"
//               id="username"
//               onChange={handleChange}
//             />
//             <FaUser className="absolute top-1/2 -translate-y-1/2 right-4 z-0 text-xl" />
//           </div>
//           <div className="relative">
//             <FloatingLabel
//               type="email"
//               variant="filled"
//               label="Your Email"
//               id="email"
//               onChange={handleChange}
//             />
//             <MdEmail className="absolute top-1/2 -translate-y-1/2 right-4 z-0 text-xl" />
//           </div>
//           <div className="relative">
//             <FloatingLabel
//               type="password"
//               variant="filled"
//               label="Your Password"
//               id="password"
//               ref={showPasswordElement}
//               onChange={handleChange}
//             />
//             {showPassword ? (
//               <GoEye
//                 className="absolute top-1/2 -translate-y-1/2 right-4 z-0 text-xl cursor-pointer"
//                 onClick={() => {
//                   setShowPassword(false);
//                   showPasswordElement.current.type = "password";
//                 }}
//               />
//             ) : (
//               <GoEyeClosed
//                 className="absolute top-1/2 -translate-y-1/2 right-4 z-0 text-xl cursor-pointer"
//                 onClick={() => {
//                   setShowPassword(true);
//                   showPasswordElement.current.type = "text";
//                 }}
//               />
//             )}
//           </div>
//           <div className="relative">
//             <FloatingLabel
//               type="password"
//               variant="filled"
//               label="Confirm Password"
//               id="confirmPassword"
//               ref={showConfirmPasswordElement}
//               onChange={handleChange}
//             />
//             {showConfirmPassword ? (
//               <GoEye
//                 className="absolute top-1/2 -translate-y-1/2 right-4 z-0 text-xl cursor-pointer"
//                 onClick={() => {
//                   setShowConfirmPassword(false);
//                   showConfirmPasswordElement.current.type = "password";
//                 }}
//               />
//             ) : (
//               <GoEyeClosed
//                 className="absolute top-1/2 -translate-y-1/2 right-4 z-0 text-xl cursor-pointer"
//                 onClick={() => {
//                   setShowConfirmPassword(true);
//                   showConfirmPasswordElement.current.type = "text";
//                 }}
//               />
//             )}
//           </div>

//           <Button type="submit" color="blue" className="w-full">
//             {loading ? <Spinner size={"sm"} /> : "Create Account"}
//           </Button>
//           {errorMessage && (
//             <Alert className="mt-3" color="failure">
//               {errorMessage}
//             </Alert>
//           )}
//         </form>
//         <div className="grid grid-cols-3 items-center text-gray-900">
//           <hr className="border-gray-500" />
//           <p className="text-center dark:text-gray-500">OR</p>
//           <hr className="border-gray-500" />
//         </div>
//         <div className="flex items-center justify-center border gap-3 border-gray-400 p-2 rounded-lg hover:bg-gray-300 hover:text-gray-800 transition-all delay-75 cursor-pointer shadow-md text-gray-400">
//           <button className="flex items-center gap-2 ">
//             <FcGoogle />
//             <span>Sign Up with Google!</span>
//           </button>
//         </div>
//         <div className="flex items-center justify-center border gap-3 border-gray-400 p-2 rounded-lg transition-all delay-75 cursor-pointer shadow-md hover:bg-gray-300 hover:text-gray-800 text-gray-400">
//           <button className="flex items-center gap-2">
//             <FaGithub />
//             <span>Sign Up with Github!</span>
//           </button>
//         </div>
//         <div>
//           <span className="text-gray-400">Already have an account?</span>
//           <Link to={"/sign-in"}>
//             <span className="text-blue-500 hover:underline ml-2 font-semibold">
//               Sign In
//             </span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;