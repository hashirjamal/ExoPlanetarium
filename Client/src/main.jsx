import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import QuizPage from "./Pages/Quiz/QuizPage.jsx";
import Home from "./Pages/Home/Home.jsx";
import LoginPage from "./Pages/LogInSignUp/LoginPage.jsx";
import SignUp from "./Pages/LogInSignUp/SignUp.jsx";
import ChatbotPage from "./Pages/Chatbot/ChatbotPage.jsx";
import BlogPage from "./Pages/BlogPage.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import CreatePost from "./Pages/CreatePost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/exoplanet-quiz",
        element: <QuizPage />,
      },
      {
        path: "/chatbot",
        element: <ChatbotPage />,
      },
    ],
  },
  {
    path: "/post/:slug",
    element: <BlogPage />,
  },
  {
    path: "/blogs",
    element: <Dashboard />,
  },
  {
    path: "/create-post",
    element: <CreatePost />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
