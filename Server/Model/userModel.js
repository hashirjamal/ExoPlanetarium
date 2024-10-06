const mongoose = require("mongoose");
const validator = require("validator");
const bycrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User name is a required field"],
      unique: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Email is a required field"],
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
      select: false,
    },
    quizScore: {
      type: Number
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    hiScore:{
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);
// applying instance method for comparing password
userSchema.methods.comparePasswordInDB = async function (
  password,
  encryptedPassword
) {
  return await bycrypt.compare(password, encryptedPassword);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // prevent from changing password repeatedly
  const valueOfSalt = 12;
  this.password = await bycrypt.hash(this.password, valueOfSalt);
  this.confirmPassword = undefined;
  next();
});
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;