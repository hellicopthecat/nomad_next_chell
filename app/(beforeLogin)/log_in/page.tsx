"use client";

import AuthLayout from "@/components/auth/authLayout";
import SharedInput from "@/components/SharedInput";
import {EnvelopeIcon, KeyIcon} from "@heroicons/react/16/solid";
import Link from "next/link";
import {useFormState} from "react-dom";
import loginAction from "./actions";
import FormBtn from "@/components/formButton";
const initializeState = {
  errMsg: undefined,
};
export default function Login() {
  const [state, action] = useFormState(loginAction, initializeState);

  return (
    <AuthLayout>
      <form action={action} className="flex flex-col gap-5 w-96">
        <SharedInput
          name="email"
          icon={<EnvelopeIcon className="size-6 text-gray-700" />}
          type="email"
          placeholder="Email"
          errMsg={state.errMsg?.fieldErrors.email || []}
          required
        />
        <SharedInput
          name="password"
          icon={<KeyIcon className="size-6 text-gray-700" />}
          type="text"
          placeholder="Password"
          errMsg={state.errMsg?.fieldErrors.password || []}
          required
        />
        <FormBtn btnTxt="Log in" />
      </form>
      <p className="text-white">
        Don&apos;t have a Account?{" "}
        <Link
          href="/create_account"
          className="text-amber-400 hover:text-amber-200"
        >
          Create Account
        </Link>
      </p>
    </AuthLayout>
  );
}
