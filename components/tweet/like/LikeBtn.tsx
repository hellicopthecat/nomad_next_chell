"use client";
import {HeartIcon as HeartOutIcon} from "@heroicons/react/24/outline";
import {HeartIcon} from "@heroicons/react/16/solid";
import {useOptimistic} from "react";
import {disLikeAction, likeAction} from "@/app/(afterLogin)/tweet/[id]/action";
interface ILikeBtnProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}
export default function LikeBtn({isLiked, likeCount, tweetId}: ILikeBtnProps) {
  const [{isLiked: liked, likeCount: count}, optimisticFn] = useOptimistic(
    {isLiked, likeCount},
    (prevState) => {
      return {
        isLiked: !prevState.isLiked,
        likeCount: prevState.isLiked
          ? prevState.likeCount - 1
          : prevState.likeCount + 1,
      };
    }
  );
  const handleLikeClick = async (tweetId: number) => {
    optimisticFn(undefined);
    if (isLiked) {
      await disLikeAction(tweetId);
    } else {
      await likeAction(tweetId);
    }
  };
  return (
    <p className="flex gap-2">
      <button onClick={() => handleLikeClick(tweetId)}>
        {liked ? (
          <HeartIcon className="size-6 text-red-600" />
        ) : (
          <HeartOutIcon className="size-6 text-gray-600" />
        )}
      </button>
      <span>{count}</span>
    </p>
  );
}
