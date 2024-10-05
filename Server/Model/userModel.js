const mongoose = require("mongoose");
const validator = require("validator");
const bycrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User name is a required field"],
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
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Password and confirm password does not match",
      },
    },
    quizScore: {
      type: Number
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    photo: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg?w=740",
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
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