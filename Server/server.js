const dotenv = require("dotenv");
dotenv.config({
    path: "./config.env", // configuration of .env file
});
const app = require("./app");
const mongoose = require("mongoose");

// establishing connection of server
process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
  console.log("Unhandled Rejection! Shutting down server");
  process.exit(1);
});
console.log(process.env.NODE_ENVIRO);

mongoose
  .connect(process.env.CONN_STR, {})
  .then((conn) => {
    console.log("DB has been connected successfully");
  })
  .catch(() => {
    console.log("DB has not been connected successfully");
  });

//Create Server
const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log("Server has been started on http://localhost:3000");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection! Shutting down server");
  server.close(() => {
    process.exit(1);
  });
});
