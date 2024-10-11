"use server";

import client from "@/libs/client";

export async function tweetData(page: number) {
  return await client.tweet.findMany({
    include: {
      Like: true,
      user: {select: {id: true, username: true}},
    },
    take: 1,
    skip: 1 * page,
  });
}
