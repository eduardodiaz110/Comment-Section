import mongoose, { Schema, models, model } from "mongoose";

const repliesSchema = new Schema(
  {
    content: String,
    score: Number,
    replyingTo: { type: Schema.Types.ObjectId, ref: "Comment" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    _id: true,
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

export const Replies =
  mongoose.models?.Replies || mongoose.model("Replies", repliesSchema);
export const Comments =
  mongoose.models?.Comments || mongoose.model("Comments", commentsSchema);
