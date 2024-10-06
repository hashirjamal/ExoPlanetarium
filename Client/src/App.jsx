import "./App.css";
import BlogPage from "./Pages/BlogPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from "./Pages/CreatePost";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-post" element={<CreatePost />}></Route>
        <Route path="/post/:slug" element={<BlogPage />}></Route>
        <Route path="/blogpost" element={<BlogPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
