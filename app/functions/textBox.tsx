interface CommentData {
  content: string;
  score: number;
  userId: string;
  replyingTo?: string;
}

export async function addCommentOrReply(
  userId: string,
  content: string,
  replyToId?: string | undefined,
  replyToUserName?: string | undefined
) {
  try {
    // Determina el body dependiendo de si es una respuesta o un comentario principal
    const bodyData: CommentData = {
      content,
      score: 0,
      userId,
    };

    if (replyToId) {
      bodyData.replyingTo = replyToId;
      bodyData.content = `@${replyToUserName} ${content}`;
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
