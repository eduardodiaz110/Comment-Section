import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import { Comments } from "../../../../models/comments";

export async function PUT(request, { params }) {
  const { id } = params;
  const requestBody = await request.json();
  await connectMongoDB();

  let updateFields = {};

  if (requestBody.newContent) updateFields.content = requestBody.newContent;
  if (requestBody.score !== undefined) updateFields.score = requestBody.score; // Considerando que 0 es un valor válido
  if (requestBody._id) updateFields._id = requestBody._id;
  if (requestBody.user) updateFields.user = requestBody.user;

  // Primero, verifica si el ID corresponde a un comentario principal
  const comment = await Comments.findOne({ _id: id });

  if (!comment) {
    // Si no es un comentario principal, verifica si es una respuesta
    const commentWithReply = await Comments.findOne({ "replies._id": id });
    if (commentWithReply) {
      const replyIndex = commentWithReply.replies.findIndex(
        (reply) => reply._id.toString() === id
      );

      if (replyIndex !== -1) {
        Object.assign(commentWithReply.replies[replyIndex], updateFields);
        await commentWithReply.save(); // Guarda los cambios en la base de datos
        return NextResponse.json({ message: "Reply Updated" }, { status: 200 });
      } else {
        return NextResponse.json({ error: "Reply not found" }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: "Reply not found" }, { status: 404 });
    }
  } else {
    await Comments.findByIdAndUpdate(id, updateFields);
    return NextResponse.json({ message: "Comment Updated" }, { status: 200 });
  }
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();

  const comment = await Comments.findOne({ _id: id });
  if (!comment) {
    // Encuentra el comentario que contiene la respuesta con el id específico
    const commentWithReply = await Comments.findOne({ "replies._id": id });
    if (commentWithReply) {
      // Filtra las respuestas para obtener la respuesta específica
      const reply = commentWithReply.replies.find(
        (reply) => reply._id.toString() === id
      );
      if (reply) {
        return NextResponse.json({ reply }, { status: 200 });
      } else {
        return NextResponse.json({ error: "Reply not found" }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: "Reply not found" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ comment }, { status: 200 });
  }
}
