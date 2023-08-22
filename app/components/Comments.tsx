"use client";

import { CommentsInterface, RepliesInterface } from "@/interfaces/interfaces";
import { Box, Typography, IconButton } from "@mui/material";
import {
  HiMiniPlus,
  HiMiniMinus,
  HiMiniArrowUturnLeft,
  HiMiniTrash,
} from "react-icons/hi2";
import { addScore, minusScore } from "../functions/comments.button";
import { useRouter } from "next/navigation";

interface CommentsProps {
  comment: CommentsInterface;
}

export default function Comments({ comment }: CommentsProps) {
  const router = useRouter();

  const handleAddScore = async (id: string) => {
    const wasUpdated = await addScore(id);
    if (wasUpdated) {
      router.refresh();
    }
  };

  const handleMinusScore = async (id: string) => {
    const wasUpdated = await minusScore(id);
    if (wasUpdated) {
      router.refresh();
    }
  };

  // const handleDelete = async (id: string) => {
  //   const wasUpdated = await minusScore(id);
  //   if (wasUpdated) {
  //     router.refresh();
  //   }
  // };

  return (
    <Box key={comment._id}>
      <Box
        my={"15px"}
        px={"20px"}
        py={"15px"}
        sx={{ backgroundColor: "#fff", borderRadius: "10px", display: "flex" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f6fa",
            color: "#5f5ea1",
            borderRadius: "6px",
            width: "35px",
            marginRight: "20px",
            height: "75px",
          }}
        >
          <IconButton
            style={{ color: "#c9c6e3", padding: "2px" }}
            onClick={() => handleAddScore(comment._id)}
          >
            <HiMiniPlus size="20px" />
          </IconButton>
          <Typography fontWeight={600}>{comment.score}</Typography>
          <IconButton
            style={{ color: "#c9c6e3", padding: "0px" }}
            onClick={() => handleMinusScore(comment._id)}
          >
            <HiMiniMinus size="20px" />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {comment.user.map((u) => (
                <Typography fontWeight={600} sx={{ color: "#404953" }}>
                  {u.username}
                </Typography>
              ))}
              <Typography
                sx={{ marginLeft: "20px", color: "#75787c" }}
                fontWeight={500}
              >
                {comment.createdAt.toLocaleUpperCase()}
              </Typography>
            </Box>

            <Box sx={{ display: "flex" }}>
              <IconButton
                style={{ color: "#595fb0", padding: "2px", marginTop: "-3px" }}
              >
                <HiMiniArrowUturnLeft size="15px" />
                <Typography
                  sx={{ marginLeft: "5px", color: "#595fb0" }}
                  fontWeight={600}
                >
                  Reply
                </Typography>
              </IconButton>
              <IconButton
                style={{
                  color: "#595fb0",
                  padding: "2px",
                  paddingLeft: "10px",
                  marginTop: "-3px",
                }}
              >
                <HiMiniTrash size="15px" />
                <Typography
                  sx={{ marginLeft: "5px", color: "#595fb0" }}
                  fontWeight={600}
                >
                  Delete
                </Typography>
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ pt: "7px" }}>
            <Typography fontWeight={400} sx={{ color: "#75787c" }}>
              {comment.content}
            </Typography>
          </Box>
        </Box>
      </Box>

      {comment.replies && comment.replies.length > 0 ? (
        //Box para Linea gris de la izq
        <Box
          sx={{
            borderStyle: "solid",
            borderColor: "#e8e9ed",
            borderWidth: "0px 0px 0px 2px",
            ml: "35px",
          }}
        >
          {comment.replies.map((reply) => (
            <Box
              ml={"20px"}
              my={"10px"}
              px={"20px"}
              py={"15px"}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f5f6fa",
                  color: "#5f5ea1",
                  borderRadius: "6px",
                  width: "29px",
                  marginRight: "20px",
                }}
              >
                <IconButton
                  style={{ color: "#c9c6e3", padding: "2px" }}
                  onClick={() => handleAddScore(reply._id)}
                >
                  <HiMiniPlus size="20px" />
                </IconButton>
                <Typography fontWeight={600}>{reply.score}</Typography>
                <IconButton
                  style={{ color: "#c9c6e3", padding: "0px" }}
                  onClick={() => handleMinusScore(reply._id)}
                >
                  <HiMiniMinus size="20px" />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {reply.user.map((u) => (
                      <Typography fontWeight={600} sx={{ color: "#404953" }}>
                        {u.username}
                      </Typography>
                    ))}
                    <Typography
                      sx={{ marginLeft: "20px", color: "#75787c" }}
                      fontWeight={500}
                    >
                      {reply.createdAt.toLocaleUpperCase()}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex" }}>
                    <IconButton
                      style={{
                        color: "#595fb0",
                        padding: "2px",
                        marginTop: "-3px",
                      }}
                    >
                      <HiMiniArrowUturnLeft size="15px" />
                    </IconButton>
                    <Typography
                      sx={{ marginLeft: "5px", color: "#595fb0" }}
                      fontWeight={600}
                    >
                      Reply
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ pt: "7px" }}>
                  <Typography fontWeight={400} sx={{ color: "#75787c" }}>
                    {reply.content}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  );
}
