const CustomError = require("./CustomErrorHandler");
const asyncErrorHandler = (func) => {
  // deal with operational error
  return (req, res, next) => {
    func(req, res, next).catch((err) => next(err));
  };
};
module.exports = asyncErrorHandler;