"use server";
interface IFormActionProps {
  success: boolean | null;
  email?: string;
  username?: string;
  password?: string;
}
export default async function formAction(
  prevState: IFormActionProps,
  formData: FormData
) {
  await new Promise((res) => setTimeout(res, 5000));
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  try {
    if (!data.email) {
      return {
        success: false,
        email: !data.email && "이메일값을 입력해주세요.",
      } as IFormActionProps;
    }
    if (!data.username) {
      return {
        success: false,
        username: !data.username && "이름값을 입력해주세요.",
      } as IFormActionProps;
    }
    if (!data.password) {
      return {
        success: false,
        password: !data.password && "비밀번호값을 입력해주세요.",
      } as IFormActionProps;
    } else if (data.password !== "12345") {
      return {
        success: false,
        password: "Wrong Password",
      } as IFormActionProps;
    }
    return {
      success: true,
      email: "",
      username: "",
      password: "",
    } as IFormActionProps;
  } catch (e) {
    console.log(e);
    return {
      success: false,
      email: "",
      username: "",
      password: "",
    } as IFormActionProps;
  }
}
