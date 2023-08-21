import { useRouter } from "next/navigation";

export default async function addScore(id: string) {
  const router = useRouter();

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
      const commentData = await response.json();

      const currentScore = commentData.comment.score;

      // Sumar 1 al valor actual de score
      const updatedScore = currentScore + 1;

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
        router.refresh(); // Redireccionar a la misma página para actualizar
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
