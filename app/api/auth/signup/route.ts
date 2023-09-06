import { NextResponse } from "next/server";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";
import connectMongoDB from "../../../../libs/mongodb";

export async function POST(request: Request) {
  const { username, email, password } = await request.json();
  if (!password || password.length < 6) {
    return NextResponse.json("Password must be at least 8 characters long");
  }

  try {
    await connectMongoDB();
    const emailFound = await User.findOne({ email });
    const usernameFound = await User.findOne({ username });

    if (emailFound) return NextResponse.json("Error: Email is already in use");
    if (usernameFound)
      return NextResponse.json("Error: Username is already in use");

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      username,
      password: hashedPassword,
    });

    await user.save();

    return NextResponse.json("Success: Account created successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}
