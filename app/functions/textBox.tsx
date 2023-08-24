export async function addCommentOrReply(content: string, replyTo?: string) {
  if (replyTo) {
    console.log(replyTo);
    try {
      const res = await fetch("http://localhost:3000/api/comments", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          content,
          score: 0,
          replyingTo: replyTo,
          user: {
            image: "imagen.png",
            username: "eduardo",
          },
        }),
      });

      if (res.ok) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }
  try {
    const res = await fetch("http://localhost:3000/api/comments", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        content,
        score: 0,
        user: {
          image: "imagen.png",
          username: "eduardo",
        },
      }),
    });

    if (res.ok) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}
