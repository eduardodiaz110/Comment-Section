"use client";

import { useEffect, useState } from "react";
import CommentsList from "./components/CommentsList";
import TextBox from "./components/TextBox";

export default function commentSection() {
  const [replyTo, setReplyTo] = useState("");

  useEffect(() => {
    console.log(replyTo); // use the replyTo value here as needed
  }, [replyTo]);

  return (
    <>
      <CommentsList setReplyTo={setReplyTo} />
      <TextBox setReplyTo={setReplyTo} replyTo={replyTo} />
    </>
  );
}
