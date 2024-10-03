"use server";

import client from "@/libs/client";

export async function tweetData(page: number) {
  return await client.tweet.findMany({
    include: {
      Like: {select: {id: true}},
      user: {select: {username: true}},
    },
    take: 1,
    skip: 1 * page,
  });
}
