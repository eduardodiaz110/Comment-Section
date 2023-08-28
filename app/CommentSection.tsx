import { useEffect, useState } from "react";
import CommentsList from "./components/CommentsList";
import TextBox from "./components/TextBox";
import { getComments } from "./functions/commentsList";
import { CommentsInterface } from "@/interfaces/interfaces";

export default function commentSection() {
  const [replyTo, setReplyTo] = useState("");
  const [comments, setComments] = useState<CommentsInterface[]>([]);

  useEffect(() => {
    async function fetchComments() {
      const fetchedComments = await getComments();
      setComments(fetchedComments.comments);
    }

    fetchComments();
  }, []);

  useEffect(() => {
    console.log("replyTo", replyTo);
  }, [replyTo]);

  return (
    <>
      <CommentsList
        comments={comments}
        setComments={setComments}
        setReplyTo={setReplyTo}
      />
      <TextBox
        comments={comments}
        setComments={setComments}
        setReplyTo={setReplyTo}
        replyTo={replyTo}
      />
    </>
  );
}
