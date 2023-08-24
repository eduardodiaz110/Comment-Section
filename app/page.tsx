import { Typography, Container } from "@mui/material";
import CommentSection from "./CommentSection";

export default function Home() {
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
        <CommentSection />
      </Container>
    </>
  );
}
