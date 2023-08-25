export async function getComments() {
  try {
    const res = await fetch("http://localhost:3000/api/comments", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch comments");
    }
    return res.json();
  } catch (error) {
    console.log("Error", error);
  }
}
