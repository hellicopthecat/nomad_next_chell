"use server";

import client from "@/libs/client";
import getSession from "@/libs/session";
import {revalidateTag} from "next/cache";
import {z} from "zod";

interface IStateProps {
  id: number;
}
const commentSchema = z.string().min(4, "4자 이상이여야합니다.");

export async function addCommentAction(state: IStateProps, formData: FormData) {
  const data = {
    comment: formData.get("comment"),
  };
  const result = await commentSchema.safeParseAsync(data.comment);
  try {
    if (!result.success) {
      console.log(result.error.formErrors.formErrors);
      return {
        id: state.id,
        errMsg: result.error.formErrors.formErrors,
      };
    }
    const session = await getSession();
    await client.comments.create({
      data: {
        comment: result.data + "",
        user: {connect: {id: session.id}},
        tweet: {connect: {id: state.id}},
      },
    });
    revalidateTag(`tweet-${state.id}`);
    return {
      id: state.id,
      errMsg: [],
    };
  } catch (error) {
    const err = error as Error;
    return {
      id: state.id,
      errMsg: err.message,
    };
  }
}

export async function likeAction(tweetId: number) {
  const session = await getSession();
  try {
    await client.like.create({
      data: {
        userId: session.id,
        tweetId,
      },
    });

    revalidateTag(`like-${tweetId}`);
  } catch (err) {
    console.log(err);
  }
}
export async function disLikeAction(tweetId: number) {
  const session = await getSession();
  try {
    await client.like.delete({
      where: {
        id: {
          userId: session.id,
          tweetId,
        },
      },
    });

    revalidateTag(`like-${tweetId}`);
  } catch (err) {
    console.log(err);
  }
}
