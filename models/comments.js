import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    image: String,
    username: String,
  },
  { _id: false }
);

const repliesSchema = new Schema(
  {
    content: String,
    score: Number,
    replyingTo: { type: Schema.Types.ObjectId, ref: "Comment" },
    user: userSchema,
  },
  {
    timestamps: true,
  }
);

const commentsSchema = new Schema(
  {
    content: String,
    score: Number,
    user: userSchema,
    replies: [repliesSchema],
  },
  {
    timestamps: true,
  }
);

const Comments =
  mongoose.models.Comments || mongoose.model("Comments", commentsSchema);

export const Replies =
  mongoose.models.Replies || mongoose.model("Replies", repliesSchema);

export default Comments;
