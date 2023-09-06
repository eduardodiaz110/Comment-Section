"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { addUser } from "../functions/register";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const Router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [result, setResult] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await addUser(
      formData.email,
      formData.password,
      formData.username
    );

    if (result.includes("Success")) {
      setResult("Usuario creado con éxito");
      setFormData({
        email: "",
        password: "",
        username: "",
      });

      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      Router.push("/dashboard");
    }

    if (result.includes("Error")) {
      setResult(result);
    }
  };

  const boxBackgroundColor = result.includes("Error") ? "red" : "green";

  return (
    <div>
      {result && (
        <Box
          style={{
            display: "flex",
            backgroundColor: boxBackgroundColor,
            alignItems: "center",
            justifyContent: "center",
            height: "35px",
          }}
        >
          <Typography color={"white"} variant="body1">
            {result}
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
        <h1>Registro</h1>
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
            type="text"
            placeholder="username"
            name="username"
            fullWidth
            onChange={handleChange}
            value={formData.username}
          />
          <TextField
            type="email"
            placeholder="email"
            name="email"
            fullWidth
            onChange={handleChange}
            value={formData.email}
          />
          <TextField
            type="password "
            placeholder="password"
            name="password"
            fullWidth
            onChange={handleChange}
            value={formData.password}
          />
          <Button
            variant="contained"
            sx={{ width: "100%", height: "50px" }}
            onClick={handleSubmit}
          >
            Registrar
          </Button>
        </Box>
      </Box>
    </div>
  );
}
