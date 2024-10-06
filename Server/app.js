const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./Router/authRoute");
const quizRouter = require("./Router/quizRoute");
const chatbotRouter = require("./Router/chatbotRoute");
const postRouter = require("./Router/postRoute");
// const chatbotRouter = require("./Router/chatbotRoute")
const app = express();

// defining Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(morgan("dev"));
app.use("/api/auth", authRouter);
app.use("/quiz", quizRouter);
app.use("/chatbot",chatbotRouter);
app.use("/chatbot",chatbotRouter);
app.use("/api/post", postRouter);

// Error Handler of production environment
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    status: "failed",
    statusCode,
    message,
  });
});
module.exports = app;
