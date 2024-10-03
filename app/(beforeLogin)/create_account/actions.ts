"use server";

import client from "@/libs/client";
import {z} from "zod";
import bcrypt from "bcrypt";
import getSession from "@/libs/session";
import {redirect} from "next/navigation";

const checkEmail = async (email: string) => {
  const user = await client.user.findFirst({
    where: {email},
    select: {id: true},
  });
  return Boolean(user?.id);
};

const userModelSchema = z
  .object({
    email: z
      .string({required_error: "값을 입력하세요."})
      .email()
      .regex(/^(\w+)@z.com$/, {message: "이메일은 @z.com만 사용가능합니다."}),
    username: z
      .string({required_error: "값을 입력하세요."})
      .min(5, {message: "5자 이상이여야합니다."}),
    password: z
      .string({required_error: "값을 입력하세요."})
      .min(10, {message: "10글자 이상이여야합니다."})
      .regex(
        /(?=.*[0-9]{1,})[\w+]{10,}/,
        "10자이상 영문이며 숫자는 하나이상들어아갸합니다."
      ),
  })
  .superRefine(async ({email}, ctx) => {
    const existsUser = await checkEmail(email);
    if (existsUser) {
      ctx.addIssue({
        code: "custom",
        message: "존재하는 이메일입니다.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export default async function formAction(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  try {
    const result = await userModelSchema.safeParseAsync(data);
    if (!result.success) {
      return result.error.flatten();
    } else {
      const hashedPassword = await bcrypt.hash(result.data.password + "", 10);
      const user = await client.user.create({
        data: {
          email: result.data.email + "",
          username: result.data.username + "",
          password: hashedPassword,
        },
        select: {id: true},
      });
      const session = await getSession();
      session.id = user.id;
      await session.save();
    }
  } catch (e) {
    console.log(e);
    redirect("/log_in");
  }
  redirect("/");
}
