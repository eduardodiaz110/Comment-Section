"use client";
import { useEffect, useState } from "react";
import { getComments } from "./functions/home";
import { Typography, Container } from "@mui/material";
import CommentSection from "./CommentSection";
import { CommentsInterface } from "@/types/interfaces";

export default function Home() {
  const [comments, setComments] = useState<CommentsInterface[]>([]);

  useEffect(() => {
    async function fetchComments() {
      const fetchedComments = await getComments();
      setComments(fetchedComments.comments);
    }

    fetchComments();
  }, []);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" pb={"30px"} style={{ textAlign: "center" }}>
          Comments Section
        </Typography>

        <CommentSection comments={comments} setComments={setComments} />
      </Container>
    </>
  );
}
