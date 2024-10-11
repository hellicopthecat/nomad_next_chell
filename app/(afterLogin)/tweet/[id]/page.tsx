import BackBtn from "@/components/BackBtn";
import Comment from "@/components/tweet/comment/Comment";
import LikeBtn from "@/components/tweet/like/LikeBtn";
import client from "@/libs/client";
import getSession from "@/libs/session";

import {PromiseReturnType} from "@prisma/client/extension";
import {unstable_cache as nextCache} from "next/cache";

interface ITweetPageProps {
  id: string;
}
async function getCachedTweet(id: number) {
  const cachedData = nextCache(tweetDetail, [`tweet-${id}`], {
    tags: [`tweet-${id}`],
  });
  return cachedData(Number(id));
}

async function tweetDetail(id: number) {
  return await client.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {select: {id: true, email: true, username: true}},
      Comments: {
        select: {id: true, comment: true, user: {select: {username: true}}},
      },
    },
  });
}
export type TweetDetailType = PromiseReturnType<typeof tweetDetail>;

async function getCachedLike(id: number) {
  const session = await getSession();
  const cachedData = nextCache(
    () => likeStatus(id, session.id),
    [`like-${id}`],
    {
      tags: [`like-${id}`],
    }
  );
  return cachedData();
}
async function likeStatus(id: number, sid: number) {
  const isLiked = await client.like.findUnique({
    where: {
      id: {
        tweetId: id,
        userId: sid,
      },
    },
  });
  const likeCount = await client.like.count({where: {tweetId: id}});
  return {isLiked: Boolean(isLiked), likeCount};
}

export default async function TweetPage({
  params: {id},
}: {
  params: ITweetPageProps;
}) {
  const tweet: TweetDetailType = await getCachedTweet(Number(id));
  const {isLiked, likeCount} = await getCachedLike(Number(id));

  return (
    <div className="flex flex-col gap-5 w-96 mx-auto border p-10 rounded-md">
      <BackBtn />
      <h1>{tweet?.tweet}</h1>
      <hr />
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <div className="size-6 bg-blue-500 rounded-full" />
          <h2>{tweet?.user.username}</h2>
        </div>
        <LikeBtn
          isLiked={isLiked}
          likeCount={likeCount}
          tweetId={Number(tweet?.id)}
        />
      </div>
      <hr />
      <Comment tweet={tweet} />
    </div>
  );
}
