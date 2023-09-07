export async function getComments() {
  try {
    const res = await fetch(
      `https://comment-section-sigma.vercel.app/api/comments`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch comments");
    }
    return res.json();
  } catch (error) {
    console.log("Error", error);
  }
}
