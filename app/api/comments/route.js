import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Comments from "../../../models/comments";

export async function POST(request) {
  const { content, replyingTo, score, user } = await request.json();
  await connectMongoDB();
  console.log("POST created");

  if (replyingTo) {
    const parentComment = await Comments.findById(replyingTo);
    if (!parentComment) {
      return NextResponse.json(
        { message: "Parent Comment not found" },
        { status: 404 }
      );
    }
    await parentComment.replies.push({ content, score, user });
    await parentComment.save();
    return NextResponse.json({ message: "Reply Created" }, { status: 201 });
  } else {
    await Comments.create({ content, score, user });
    return NextResponse.json({ message: "Comment Created" }, { status: 201 });
  }
}

export async function GET() {
  await connectMongoDB();
  console.log("GET created2");

  const comments = await Comments.find();
  return NextResponse.json({ comments });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  console.log(`Trying to delete ID: ${id}`); // Debug log

  await connectMongoDB(); // Make sure to call the function here.
  console.log("DELETE created");

  const comment = await Comments.findById(id);
  console.log(`Comment found: ${comment}`); // Debug log

  // If the comment with the given ID is found, delete it.
  if (comment) {
    await comment.deleteOne();
    return NextResponse.json({ message: "Comment Deleted" }, { status: 200 });
  }

  // If not found in main comments, search for it in replies.
  const commentWithReply = await Comments.findOne({ "replies._id": id });

  // If a comment with a reply matching the given ID is found, delete that reply.
  if (commentWithReply) {
    commentWithReply.replies.pull(id); // remove the reply with the matching ID
    await commentWithReply.save();
    return NextResponse.json({ message: "Reply Deleted" }, { status: 200 });
  }

  // If neither a comment nor a reply with the given ID is found, return an error message.
  return NextResponse.json({ message: "ID not found" }, { status: 404 });
}
