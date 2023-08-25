export async function addCommentOrReply(content: string, replyTo?: string) {
  try {
    // Determina el body dependiendo de si es una respuesta o un comentario principal
    const bodyData = replyTo
      ? {
          content,
          score: 0,
          replyingTo: replyTo,
          user: {
            image: "imagen.png",
            username: "eduardo",
          },
        }
      : {
          content,
          score: 0,
          user: {
            image: "imagen.png",
            username: "eduardo",
          },
        };

    const res = await fetch("http://localhost:3000/api/comments", {
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
