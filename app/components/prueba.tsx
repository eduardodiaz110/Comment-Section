"use client";
import { CommentsInterface } from "@/types/interfaces";
import Comments from "./Comments";
import { Typography, Grid } from "@mui/material";
import { getComments } from "../functions/home";

export default async function Prueba() {
  const { comments } = await getComments();

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
          <Typography>{comment.content}</Typography>
        </Grid>
      ))}
    </Grid>
  );
}
