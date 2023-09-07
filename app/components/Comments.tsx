import { CommentsInterface, RepliesInterface } from "@/types/interfaces";
import { Box, Typography, IconButton } from "@mui/material";
import {
  HiMiniPlus,
  HiMiniMinus,
  HiMiniArrowUturnLeft,
  HiMiniTrash,
} from "react-icons/hi2";
import {
  addScore,
  minusScore,
  deleteCommentOrReply,
  replyToComment,
} from "../functions/comments";
import { useRouter } from "next/navigation";

type CommentsProps = {
  comment: CommentsInterface;
  setComments: (comments: any) => void;
  setReplyTo: (
    replyTo:
      | {
          parentComment?: CommentsInterface | RepliesInterface | undefined;
          replyToComment?: CommentsInterface | RepliesInterface | undefined;
        }
      | undefined
  ) => void;
};

export default function Comments({
  setComments,
  comment,
  setReplyTo,
}: CommentsProps) {
  const handleAddScore = async (id: string) => {
    const updatedScore = await addScore(id);
    if (updatedScore !== undefined && updatedScore !== null) {
      setComments((prevComments: any) => {
        return prevComments.map((comment: any) => {
          if (comment._id === id) {
            // Si el ID coincide con un comentario principal
            return { ...comment, score: updatedScore };
          }

          // Si el ID no coincide con un comentario principal, buscamos en las respuestas
          if (comment.replies) {
            const updatedReplies = comment.replies.map((reply: any) => {
              if (reply._id === id) {
                return { ...reply, score: updatedScore };
              }
              return reply;
            });
            return { ...comment, replies: updatedReplies };
          }

          return comment; // Si no se encuentra el ID en los comentarios ni en las respuestas
        });
      });
    }
  };

  const handleMinusScore = async (id: string) => {
    const updatedScore = await minusScore(id);
    if (updatedScore !== undefined && updatedScore !== null) {
      setComments((prevComments: any) => {
        return prevComments.map((comment: any) => {
          if (comment._id === id) {
            // Si el ID coincide con un comentario principal
            return { ...comment, score: updatedScore };
          }

          // Si el ID no coincide con un comentario principal, buscamos en las respuestas
          if (comment.replies) {
            const updatedReplies = comment.replies.map((reply: any) => {
              if (reply._id === id) {
                return { ...reply, score: updatedScore };
              }
              return reply;
            });
            return { ...comment, replies: updatedReplies };
          }

          return comment; // Si no se encuentra el ID en los comentarios ni en las respuestas
        });
      });
    }
  };

  const handleDelete = async (id: string) => {
    const wasDeleted = await deleteCommentOrReply(id);
    if (wasDeleted) {
      setComments((prevComments: any) => {
        // Busca si el ID pertenece a un comentario
        const isComment = prevComments.some(
          (comment: any) => comment._id === id
        );

        if (isComment) {
          // Si es un comentario, elimínalo
          return prevComments.filter((comment: any) => comment._id !== id);
        } else {
          // Si no es un comentario, podría ser una respuesta. Actualiza el comentario que contiene esa respuesta
          return prevComments.map((comment: any) => {
            if (comment.replies.some((reply: any) => reply._id === id)) {
              return {
                ...comment,
                replies: comment.replies.filter(
                  (reply: any) => reply._id !== id
                ),
              };
            }
            return comment;
          });
        }
      });
    }
  };

  const handleReply = async (parentComment: any, replyToComment: any) => {
    const sectionElement = document.getElementById("textBox");

    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
      setReplyTo({
        parentComment,
        replyToComment,
      });
    } else {
      console.error(`Elemento con ID "textBox" no encontrado.`);
    }
  };

  function StyledContent({ content }: any) {
    const [mention, ...rest] = content.split(" ");
    if (mention.startsWith("@")) {
      return (
        <>
          <span style={{ fontWeight: 600, color: "rgb(89, 95, 176)" }}>
            {mention}
          </span>{" "}
          {rest.join(" ")}
        </>
      );
    }
    return content;
  }

  return (
    <Box key={`commentId-${comment._id}`}>
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
              <Typography fontWeight={600} sx={{ color: "#404953" }}>
                {comment.user.username}
              </Typography>
              <Typography
                sx={{ marginLeft: "20px", color: "#75787c" }}
                fontWeight={500}
              >
                {comment.createdAt}
              </Typography>
            </Box>

            <Box sx={{ display: "flex" }}>
              <IconButton
                style={{ color: "#595fb0", padding: "2px", marginTop: "-3px" }}
                onClick={() => handleReply(comment, comment)}
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
                onClick={() => handleDelete(comment._id)}
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
              <StyledContent content={comment.content} />
            </Typography>
          </Box>
        </Box>
      </Box>

      {comment.replies ? (
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
              key={`replyId-${reply._id}`}
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
                    <Typography fontWeight={600} sx={{ color: "#404953" }}>
                      {reply.user.username}
                    </Typography>
                    <Typography
                      sx={{ marginLeft: "20px", color: "#75787c" }}
                      fontWeight={500}
                    >
                      {reply.createdAt}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex" }}>
                    <IconButton
                      style={{
                        color: "#595fb0",
                        padding: "2px",
                        marginTop: "-3px",
                      }}
                      onClick={() => handleReply(comment, reply)}
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
                      onClick={() => handleDelete(reply._id)}
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
                    <StyledContent content={reply.content} />
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
