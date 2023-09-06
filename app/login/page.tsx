"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogInPage() {
  const Router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

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
          sx={{
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
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Iniciar Sesion</h1>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          gap: "10px",
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: "40%" }}>
          <Box
            sx={{
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
              value={formData.email}
            />
            <TextField
              type="password"
              placeholder="password"
              name="password"
              fullWidth
              onChange={handleChange}
              value={formData.password}
            />
            <Button
              variant="contained"
              sx={{ width: "100%", height: "50px" }}
              type="submit"
            >
              Iniciar Sesion
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
}
