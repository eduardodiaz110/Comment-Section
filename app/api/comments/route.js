import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Comments from "../../../models/comments";

export async function POST(request) {
  const { content, replyingTo, score, user } = await request.json();
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
      const newReply = { content, score, user };
      parentComment.replies.push(newReply);
      await parentComment.save(); // Cuando le das a .save(), se ejecutan las reglas que establecimos en el modelo, si alguna de estas falla, tira un error y por lo tanto llega al catch de la funcion y devuelve un error a traves de la API

      newReply._id =
        parentComment.replies[parentComment.replies.length - 1]._id;

      return NextResponse.json(newReply, { status: 201 }); // El status 201 es "Created successfully"
    } else {
      const newComment = await Comments.create({ content, score, user });

      return NextResponse.json(newComment, { status: 201 });
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
    // Para otros tipos de errores, devuelve un error genérico
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    ); // 500 es de server error, se manda cuando no tienes idea de que pudo haber salido mal
  }
}

export async function GET() {
  await connectMongoDB();

  const comments = await Comments.find();
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
