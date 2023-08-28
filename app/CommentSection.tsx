import { useEffect, useState } from "react";
import CommentsList from "./components/CommentsList";
import TextBox from "./components/TextBox";

export default function CommentSection({
  comments,
  setComments,
}: {
  comments: any;
  setComments: any;
}) {
  const [replyTo, setReplyTo] = useState("");

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
