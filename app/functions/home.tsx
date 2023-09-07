export async function getComments() {
  try {
    console.log(`${process.env.NEXTAUTH_URL}/api/comments`);
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/comments`, {
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
