import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import { Comments } from "../../../models/comments";
import mongoose from "mongoose";
import { User } from "../../../models/comments";

export async function POST(request) {
  const { content, replyingTo, score, userId } = await request.json();
  console.log("request", content, replyingTo, score, userId);
  await connectMongoDB();

  try {
    if (replyingTo) {
      const parentComment = await Comments.findById(replyingTo);
      if (!parentComment) {
        return NextResponse.json(
          { message: "Parent Comment not found" },
          { status: 404 }
        );
      }

      // Crear un nuevo objeto de respuesta
      const newReply = { content, score, user: userId };
      parentComment.replies.push(newReply);
      await parentComment.save();

      // Obtener el ID del nuevo reply
      newReply._id =
        parentComment.replies[parentComment.replies.length - 1]._id;

      // Obtener la fecha de creación del nuevo reply
      newReply.createdAt =
        parentComment.replies[parentComment.replies.length - 1].createdAt;

      // Buscar el usuario correspondiente al userId
      const user = await User.findById(userId);

      // Verificar si el usuario existe
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      // Añadir el username al nuevo reply antes de devolverlo
      const newReplyWithDetails = {
        ...newReply,
        user: {
          _id: userId,
          username: user.username, // Añadir el username
        },
      };

      return NextResponse.json(newReplyWithDetails, { status: 201 }); // El status 201 es "Created successfully"
    } else {
      const newComment = await Comments.create({
        content,
        score,
        user: userId,
      });

      const user = await User.findById(userId);

      // Añadir el username al nuevo comentario antes de devolverlo
      const newCommentWithUsername = {
        ...newComment._doc, // Desestructurar el documento para poder modificarlo
        user: {
          ...newComment._doc.user,
          username: user.username, // Añadir el username
        },
      };

      return NextResponse.json(newCommentWithUsername, { status: 201 });
    }
  } catch (error) {
    // Si hay un error de validación de Mongoose

    if (error instanceof mongoose.Error.ValidationError) {
      // Devuelve un error con detalles sobre la validación
      return NextResponse.json(
        { message: "Validation failed", details: error.errors },
        { status: 400 } // 400 es http error de bad request, significa que el cliente no mando bien la informacion
      );
    }

    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Duplicate key error", details: error.keyValue },
        { status: 409 } // 409 es un código de estado HTTP para conflictos
      );
    }
    // Para otros tipos de errores, devuelve un error genérico
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    ); // 500 es de server error, se manda cuando no tienes idea de que pudo haber salido mal
  }
}

export async function GET() {
  await connectMongoDB();
  const comments = await Comments.find()
    .populate("user")
    .populate("replies.user");
  return NextResponse.json({ comments });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");

  await connectMongoDB(); // Make sure to call the function here.

  const comment = await Comments.findById(id);

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
