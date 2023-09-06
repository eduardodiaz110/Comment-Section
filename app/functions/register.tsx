export async function addUser(
  email: string,
  password: string,
  username: string
) {
  try {
    const bodyData = {
      username,
      email,
      password,
    };

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (res.ok) {
      const resData = await res.json();
      return resData;
    }
  } catch (error) {
    return console.log(error);
  }
}
