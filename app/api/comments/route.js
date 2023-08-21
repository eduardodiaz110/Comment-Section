import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Comments from "../../../models/comments";

export async function POST(request) {
  const { content, replyingTo, score, user } = await request.json();
  await connectMongoDB();

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
  const comments = await Comments.find();
  return NextResponse.json({ comments });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB;
  await Comments.findByIdAndDelete(id);
  return NextResponse.json({ message: "Comment Deleted" }, { status: 200 });
}
