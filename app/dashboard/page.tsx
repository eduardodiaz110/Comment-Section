"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  console.log(session, status);
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify({ session, status }, null, 2)}</pre>
    </div>
  );
}
