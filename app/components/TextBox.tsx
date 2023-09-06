"use client";
import { Typography, Box, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { addCommentOrReply } from "../functions/textBox";
import { useSession } from "next-auth/react";
import { HiMiniChatBubbleLeft } from "react-icons/hi2";
import { CommentsInterface } from "@/types/interfaces";

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
  setReplyTo: (replyTo: CommentsInterface | undefined) => void;
  replyTo: CommentsInterface | undefined;
}) {
  const { data: session } = useSession() as {
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
      replyTo?._id
    );

    if (addedCommentOrReply) {
      setContent("");

      if (replyTo) {
        const updatedComments = comments.map((comment: any) => {
          if (comment._id === replyTo._id) {
            return {
              ...comment,
              replies: [...comment.replies, addedCommentOrReply],
            };
          }
          return comment;
        });
        setComments(updatedComments); // Esto actualiza el estado de tus comentarios
      } else {
        setComments([...comments, addedCommentOrReply]);
      }

      setReplyTo(undefined);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  return (
    <>
      {replyTo ? (
        <Box
          maxWidth={"695px"}
          paddingTop={"10px"}
          paddingBottom={"25px"}
          marginBottom={"-35px"}
          px={"20px"}
          sx={{
            backgroundColor: "#595fb0",
            borderRadius: "10px",
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          <HiMiniChatBubbleLeft color="white" size="16px" />

          <Typography sx={{ color: "white", paddingLeft: "7px" }}>
            Respondiendo a {replyTo.user.username}
          </Typography>
        </Box>
      ) : null}

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
