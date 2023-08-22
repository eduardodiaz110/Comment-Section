export async function addScore(id: string) {
  console.log(id);
  if (!id) {
    alert("No se encontro el id");
    return; //prueba
  }
  try {
    // Hacer una solicitud GET para obtener los detalles del comentario
    const response = await fetch(`http://localhost:3000/api/comments/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const currentScore = data.comment || data.reply;

      // Sumar 1 al valor actual de score
      const updatedScore = currentScore.score + 1;

      // Realizar la solicitud PUT para actualizar el score
      const updateResponse = await fetch(
        `http://localhost:3000/api/comments/${id}`,
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
        return true;
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
    const response = await fetch(`http://localhost:3000/api/comments/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      // console.log(data);

      const currentScore = data.comment.score || data.reply.score;
      // console.log("scor", currentScore);

      // Disminuir 1 al valor actual de score
      const updatedScore = currentScore - 1;

      // Realizar la solicitud PUT para actualizar el score
      const updateResponse = await fetch(
        `http://localhost:3000/api/comments/${id}`,
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
        return true;
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
