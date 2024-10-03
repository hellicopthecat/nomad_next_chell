import TweetList from "@/components/tweet/TweetList";
import client from "@/libs/client";
import {Prisma} from "@prisma/client";

async function tweetData() {
  return await client.tweet.findMany({
    include: {
      Like: {select: {id: true}},
      user: {select: {username: true}},
    },
    take: 1,
  });
}
export type InitialtweetType = Prisma.PromiseReturnType<typeof tweetData>;

export default async function Home() {
  const tweets = await tweetData();

  return (
    <div>
      <TweetList initialTweet={tweets} />
    </div>
  );
}
