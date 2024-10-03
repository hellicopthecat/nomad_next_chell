import BackBtn from "@/components/BackBtn";
import client from "@/libs/client";
import {HeartIcon} from "@heroicons/react/16/solid";

interface ITweetPageProps {
  id: string;
}
async function tweetDetail(id: string) {
  return await client.tweet.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      Like: {select: {id: true}},
      user: {select: {id: true, email: true, username: true}},
    },
  });
}
export default async function TweetPage({
  params: {id},
}: {
  params: ITweetPageProps;
}) {
  const tweet = await tweetDetail(id);

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
        <p className="flex gap-2">
          <span>
            <HeartIcon className="size-6 text-red-600" />
          </span>
          <span>{tweet?.Like.length}</span>
        </p>
      </div>
    </div>
  );
}
