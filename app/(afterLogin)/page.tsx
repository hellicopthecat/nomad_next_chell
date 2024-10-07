import TweetList from "@/components/tweet/TweetList";
import client from "@/libs/client";
import {Prisma} from "@prisma/client";
import AddTweet from "./tweet/AddTweet";
import {unstable_cache as nextCache} from "next/cache";
const getCachedTweets = nextCache(tweetData, ["Tweet-Data"], {
  tags: ["Tweet-Data"],
});
async function tweetData() {
  return await client.tweet.findMany({
    include: {
      Like: {select: {id: true}},
      user: {select: {username: true}},
    },
    take: 3,
  });
}
export type InitialtweetType = Prisma.PromiseReturnType<typeof tweetData>;

export default async function Home() {
  const tweets = await getCachedTweets();

  return (
    <div className="flex flex-col items-center gap-5">
      <AddTweet />
      <TweetList initialTweet={tweets} />
    </div>
  );
}
