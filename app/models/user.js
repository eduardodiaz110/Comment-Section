import mongoose, { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email is already taken"],
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is not valid",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    username: String,
    image: String,
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
