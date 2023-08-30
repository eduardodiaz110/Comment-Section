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

const repliesSchema = new Schema(
  {
    content: String,
    score: Number,
    replyingTo: { type: Schema.Types.ObjectId, ref: "Comment" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const commentsSchema = new Schema(
  {
    content: String,
    score: Number,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    replies: [repliesSchema],
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model("User", userSchema);

export const Replies =
  mongoose.models.Replies || mongoose.model("Replies", repliesSchema);

export const Comments =
  mongoose.models.Comments || mongoose.model("Comments", commentsSchema);
