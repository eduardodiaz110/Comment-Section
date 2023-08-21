import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Comments from "../../../../models/comments";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newContent: content, score, _id, user } = await request.json();
  await connectMongoDB();
  await Comments.findByIdAndUpdate(id, { content: content, score, _id, user });
  return NextResponse.json({ message: "Comment Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const comment = await Comments.findOne({ _id: id });
  return NextResponse.json({ comment }, { status: 200 });
}
