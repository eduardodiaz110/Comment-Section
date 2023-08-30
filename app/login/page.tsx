"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { addUser } from "../functions/register";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogInPage() {
  const Router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "username":
        setUsername(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    console.log(res);

    if (res?.error) {
      return setError(res.error as string);
    }

    if (res?.ok) {
      return Router.push("/dashboard");
    }
  };

  return (
    <div>
      {error && (
        <Box
          style={{
            display: "flex",
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
            height: "35px",
          }}
        >
          <Typography color={"white"} variant="body1">
            {error}
          </Typography>
        </Box>
      )}
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Iniciar Sesion</h1>
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          gap: "10px",
        }}
      >
        <Box
          width="40%"
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <TextField
            type="email"
            placeholder="email"
            name="email"
            fullWidth
            onChange={handleChange}
            value={email}
          />
          <TextField
            type="password "
            placeholder="password"
            name="password"
            fullWidth
            onChange={handleChange}
            value={password}
          />
          <Button
            variant="contained"
            sx={{ width: "100%", height: "50px" }}
            onClick={handleSubmit}
          >
            Iniciar Sesion
          </Button>
        </Box>
      </Box>
    </div>
  );
}
