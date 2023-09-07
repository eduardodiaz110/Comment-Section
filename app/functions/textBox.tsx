import { CommentsInterface, RepliesInterface } from "@/types/interfaces";

interface CommentData {
  content: string;
  score: number;
  userId: string;
  replyingTo?: string;
}

export async function addCommentOrReply(
  userId: string,
  content: string,
  parentComment: CommentsInterface | RepliesInterface | undefined,
  replyToComment: CommentsInterface | RepliesInterface | undefined
) {
  try {
    // Determina el body dependiendo de si es una respuesta o un comentario principal
    const bodyData: CommentData = {
      content,
      score: 0,
      userId,
    };

    if (parentComment && replyToComment) {
      bodyData.replyingTo = parentComment._id as string;
      bodyData.content = `@<span style="font-weight:bold; color:rgb(89, 95, 176);">${replyToComment.user.username}</span> ${content}`;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (res.ok) {
      // Parsea la respuesta como JSON y retorna
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
