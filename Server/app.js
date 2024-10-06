const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./Router/authRoute");
const quizRouter = require("./Router/quizRoute");
const chatbotRouter = require("./Router/chatbotRoute");
// const chatbotRouter = require("./Router/chatbotRoute")
const app = express();

// defining Middlewares
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:4173",
  "http://localhost:5173",
]

const corsOptions = {
  origin: allowedOrigins,
  // origin: process.env.NODE_ENV === "production" ? "http://localhost:4173" : "http://localhost:5173",
  credentials: true,
};



app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use("/api/auth", authRouter);
app.use("/quiz", quizRouter);
app.use("/chatbot",chatbotRouter);
app.use("/chatbot",chatbotRouter);

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
