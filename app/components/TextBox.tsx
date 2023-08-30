"use client";
import { Typography, Grid, Box, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addCommentOrReply } from "../functions/textBox";
import { useSession } from "next-auth/react";

interface CustomUser {
  _id?: string;
}

export default function TextBox({
  comments,
  setComments,
  setReplyTo,
  replyTo,
}: {
  comments: any;
  setComments: any;
  setReplyTo: (value: string) => void;
  replyTo: string;
}) {
  const { data: session, status } = useSession() as {
    data: { user: CustomUser };
    status: string;
  };
  const [content, setContent] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!content) {
      alert("Escribe algo perra");
      return;
    }

    const addedCommentOrReply = await addCommentOrReply(
      session.user._id as string,
      content,
      replyTo
    );

    if (addedCommentOrReply) {
      setContent("");

      if (replyTo) {
        const updatedComments = comments.map((comment: any) => {
          if (comment._id === replyTo) {
            return {
              ...comment,
              replies: [...comment.replies, addedCommentOrReply],
            };
          }
          return comment;
        });
        setComments(updatedComments); // Esto actualiza el estado de tus comentarios
      } else {
        console.log(addedCommentOrReply);
        setComments([...comments, addedCommentOrReply]);
      }

      setReplyTo("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  return (
    <>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
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
