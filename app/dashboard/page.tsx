"use client";
import { Button, Typography } from "@mui/material";
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  console.log(session, status);
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify({ session, status }, null, 2)}</pre>
      <Button
        style={{
          padding: "10px 20px",
          color: "white",
          textDecoration: "none",
          fontWeight: "500",
          backgroundColor: "#595fb0",
        }}
        onClick={() => {
          signOut();
        }}
      >
        <Typography>Sign Out</Typography>
      </Button>
    </div>
  );
}
