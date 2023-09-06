export async function addScore(id: string) {
  if (!id) {
    alert("No se encontro el id");
    return; //prueba
  }
  try {
    // Hacer una solicitud GET para obtener los detalles del comentario
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/comments/${id}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      const currentScore = data.comment || data.reply;

      // Sumar 1 al valor actual de score
      const updatedScore = currentScore.score + 1;

      // Realizar la solicitud PUT para actualizar el score
      const updateResponse = await fetch(
        `${process.env.NEXTAUTH_URL}/api/comments/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            score: updatedScore,
          }),
        }
      );

      if (updateResponse.ok) {
        // El score se actualizó correctamente
        return updatedScore;
      } else {
        // Manejar errores de la solicitud PUT
        console.log("Error solicitud PUT");
      }
    } else {
      // Manejar errores de la solicitud GET
      console.log("Error solicitud GET");
    }
  } catch (error) {
    // Manejar errores generales
    console.log(error);
  }
}

export async function minusScore(id: string) {
  if (!id) {
    alert("No se encontro el id");
    return; //prueba
  }
  try {
    // Hacer una solicitud GET para obtener los detalles del comentario
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/comments/${id}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      const currentScore = data.comment || data.reply;

      // Sumar 1 al valor actual de score
      const updatedScore = currentScore.score - 1;

      // Realizar la solicitud PUT para actualizar el score
      const updateResponse = await fetch(
        `${process.env.NEXTAUTH_URL}/api/comments/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            score: updatedScore,
          }),
        }
      );

      if (updateResponse.ok) {
        // El score se actualizó correctamente
        return updatedScore;
      } else {
        // Manejar errores de la solicitud PUT
        console.log("Error solicitud PUT");
      }
    } else {
      // Manejar errores de la solicitud GET
      console.log("Error solicitud GET");
    }
  } catch (error) {
    // Manejar errores generales
    console.log(error);
  }
}

export async function deleteCommentOrReply(id: string) {
  if (!id) {
    alert("No se encontro el id");
    return; //prueba
  }
  try {
    // Hacer una solicitud GET para obtener los detalles del comentario
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/comments/?id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (response.ok) {
      return true;
    }
  } catch (error) {
    // Manejar errores generales
    console.log(error);
  }
}

export async function replyToComment(replyTo: string) {
  if (!replyTo) {
    alert("Escribe algo perra");
    return;
  }
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/comments/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        content: "hola",
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
