"use client";
import { Typography, Grid, Box, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addCommentOrReply } from "../functions/textBox";

export default function TextBox({
  setReplyTo,
  replyTo,
}: {
  setReplyTo: (value: string) => void;
  replyTo: string;
}) {
  const router = useRouter();
  const [content, setContent] = useState("");

  const handleSubmit = async (e: any) => {
    if (replyTo) {
      console.log("respuesta", replyTo);
    }
    e.preventDefault();
    if (!content) {
      alert("Escribe algo perra");
      return;
    }
    const addCommentorReply = await addCommentOrReply(content, replyTo);
    if (addCommentorReply) {
      setContent("");
      router.refresh();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  return (
    <>
      <Box
        maxWidth={"700px"}
        my={"15px"}
        px={"20px"}
        py={"15px"}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box id="textBox" sx={{ width: "100%", display: "flex" }}>
          <TextField
            sx={{ width: "85%", mr: "10px" }}
            name="postComment"
            placeholder="Escibre un comentario"
            variant="outlined"
            onChange={handleChange}
            multiline={true}
            rows={4}
            value={content}
          />
          <Button
            variant="contained"
            sx={{ width: "15%", height: "50px" }}
            onClick={handleSubmit}
          >
            PUBLICAR
          </Button>
        </Box>
      </Box>
    </>
  );
}
