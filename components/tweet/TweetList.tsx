"use client";
import {tweetData} from "@/app/(afterLogin)/action";
import {InitialtweetType} from "@/app/(afterLogin)/page";
import {dateFormatter} from "@/libs/utils";
import {HeartIcon} from "@heroicons/react/16/solid";
import Link from "next/link";
import {useState} from "react";

interface IInitialTweetList {
  initialTweet: InitialtweetType;
}
export default function TweetList({initialTweet}: IInitialTweetList) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState(initialTweet);
  const [lastPage, setLastPage] = useState(false);
  const loadMore = async () => {
    setLoading(true);
    if (initial.length !== 0) {
      setPage((prev) => prev + 1);
      const newData = await tweetData(page);
      setInitial((prev) => [...prev, ...newData]);
    } else {
      setLastPage(true);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-10 w-96 mx-auto">
      {initial.map((tweet) => (
        <Link
          href={`/tweet/${tweet.id}`}
          key={tweet.id}
          className="flex flex-col gap-5 border p-4 rounded-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-5 bg-blue-500 rounded-full" />
              <p>{tweet.user.username}</p>
            </div>
            <p className="text-sm text-gray-300">
              {dateFormatter(tweet.createdAt)}
            </p>
          </div>

          <h2 className="font-bold">{tweet.tweet}</h2>

          <p className="flex items-center gap-2">
            <span>
              <HeartIcon className="size-5 text-red-500" />
            </span>
            <span>{tweet.Like.length}</span>
          </p>
        </Link>
      ))}
      {!lastPage && (
        <button
          onClick={loadMore}
          disabled={loading}
          className="bg-blue-500 disabled:bg-slate-600"
        >
          {loading ? "Loading.." : "Load More"}
        </button>
      )}
    </div>
  );
}
