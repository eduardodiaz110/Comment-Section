interface CommentData {
  content: string;
  score: number;
  userId: string;
  replyingTo?: string;
}

export async function addCommentOrReply(
  userId: string,
  content: string,
  replyTo?: string | undefined
) {
  try {
    // Determina el body dependiendo de si es una respuesta o un comentario principal
    const bodyData: CommentData = {
      content,
      score: 0,
      userId,
    };

    if (replyTo) {
      bodyData.replyingTo = replyTo;
    }

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/comments`, {
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
