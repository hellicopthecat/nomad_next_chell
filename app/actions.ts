"use server";

import {typeToFlattenedError, z} from "zod";

interface IErrorObj {
  email: string[];
  username: string[];
  password: string[];
}

export interface IFormActionProps {
  success: boolean | null;
  errMsg: undefined | typeToFlattenedError<IErrorObj>;
}
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
        "글자와 숫자로 이루어지며 숫자는 하나 이상이 들어가야합니다.(0123456789)"
      ),
  })
  .required({email: true, username: true, password: true});

export default async function formAction(
  prevState: IFormActionProps,
  formData: FormData
) {
  await new Promise((res) => setTimeout(res, 1000));
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  try {
    const result = await userModelSchema.safeParseAsync(data);
    if (!result.success) {
      return {
        success: false,
        errMsg: result.error.flatten(),
      };
    }
    return {
      success: true,
      errMsg: undefined,
    };
  } catch (e) {
    return {
      success: false,
      errMsg: e,
    } as IFormActionProps;
  }
}
