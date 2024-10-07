"use server";

import client from "@/libs/client";
import getSession from "@/libs/session";
import {revalidateTag} from "next/cache";
import {notFound} from "next/navigation";
import {z} from "zod";

const tweetSchema = z.string().min(5, "5글자 이상이여야합니다.");

interface IErrorMsg {
  _errors: string[];
}
export default async function addTweetAction(
  State: null | IErrorMsg,
  formData: FormData
) {
  const data = {
    tweet: formData.get("tweet"),
  };
  const result = await tweetSchema.safeParseAsync(data.tweet);
  try {
    if (!result.success) {
      return result.error.format();
    }
    const session = await getSession();
    await client.tweet.create({
      data: {
        tweet: data.tweet + "",
        user: {connect: {id: session.id}},
      },
    });
    revalidateTag("Tweet-Data");
    return {
      _errors: [],
    };
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
    notFound();
  }
}
