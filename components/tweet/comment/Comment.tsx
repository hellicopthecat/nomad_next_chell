"use client";
import {TweetDetailType} from "@/app/(afterLogin)/tweet/[id]/page";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import {useOptimistic} from "react";
interface ICommentProps {
  tweet: TweetDetailType;
}
export default function Comment({tweet}: ICommentProps) {
  const [state, setStateFn] = useOptimistic(
    tweet?.Comments ?? [],
    (prevState, payload) => [
      ...prevState,
      {
        id: prevState.length + 1,
        user: {username: tweet?.user.username + ""},
        comment: payload + "",
      },
    ]
  );

  return (
    <div className="flex flex-col gap-5">
      <AddComment tweetId={Number(tweet?.id)} optimisticFn={setStateFn} />
      <CommentList comments={state} />
    </div>
  );
}
