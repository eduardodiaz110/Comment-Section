import { CommentsInterface } from "@/interfaces/interfaces";
import Comments from "./Comments";
import { Typography, Grid } from "@mui/material";
import { getComments } from "../functions/commentsList";

export default function CommentsList({
  comments,
  setComments,
  setReplyTo,
}: {
  comments: any;
  setComments: any;
  setReplyTo: (value: string) => void;
}) {
  return (
    <Grid container spacing={2} maxWidth={"700px"}>
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
          <Comments
            comments={comments}
            setComments={setComments}
            comment={comment}
            setReplyTo={setReplyTo}
          />
        </Grid>
      ))}
    </Grid>
  );
}
