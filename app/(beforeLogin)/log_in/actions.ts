"use server";
import client from "@/libs/client";
import {typeToFlattenedError, z} from "zod";
import bcrypt from "bcrypt";
import getSession from "@/libs/session";
import {redirect} from "next/navigation";
interface ILoginFieldError {
  email: string[];
  password: string[];
}
interface ILoginActionProps {
  errMsg: undefined | typeToFlattenedError<ILoginFieldError>;
}

const existsEmail = async (email: string) => {
  const user = await client.user.findFirst({
    where: {email},
    select: {id: true},
  });
  return Boolean(user?.id);
};

const loginSchema = z
  .object({
    email: z
      .string()
      .email()
      .refine((email) => existsEmail(email), "유저가 존재하지 않습니다."),
    password: z
      .string()
      .regex(
        /(?=.*[0-9])[\w+]{10,}/,
        "10자이상 영문이며 숫자는 하나이상들어아갸합니다."
      ),
  })
  .required({email: true, password: true});

export default async function loginAction(
  prevState: ILoginActionProps,
  formData: FormData
) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  try {
    const result = await loginSchema.safeParseAsync(data);
    if (!result.success) {
      return {
        errMsg: result.error.flatten(),
      };
    } else {
      const user = await client.user.findFirst({
        where: {email: result.data.email},
        select: {
          id: true,
          password: true,
        },
      });
      const ok = await bcrypt.compare(
        result.data.password,
        user?.password + ""
      );
      if (ok) {
        const session = await getSession();
        session.id = Number(user?.id);
        await session.save();
      } else {
        return {
          errMsg: {
            formErrors: [],
            fieldErrors: {
              password: ["비밀번호가 일치하지 않습니다."],
              email: [],
            },
          },
        } as ILoginActionProps;
      }
    }
  } catch (err) {
    const errMsg = err as Error;
    return {
      errMsg: {
        formErrors: [errMsg.message],
      },
    } as ILoginActionProps;
  }
  redirect("/");
}
