import { CommentsInterface } from "@/interfaces/interfaces";
import Comments from "./Comments";
import { Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";

const getComments = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/comments", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch comments");
    }
    return res.json();
  } catch (error) {
    console.log("Error", error);
  }
};

export default function CommentsList({
  setReplyTo,
}: {
  setReplyTo: (value: string) => void;
}) {
  const [comments, setComments] = useState<CommentsInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      (async () => {
        const result = await getComments();
        setComments(result.comments);
        setIsLoading(false);
      })();
    }
  }, []);

  return (
    <Grid container maxWidth={"700px"}>
      {comments.map((comment: CommentsInterface) => (
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          xl={12}
          key={comment._id}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Comments comment={comment} setReplyTo={setReplyTo} />
        </Grid>
      ))}
    </Grid>
  );
}
