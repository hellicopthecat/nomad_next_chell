"use client";

import {useFormState} from "react-dom";
import formAction from "./actions";
import AuthBtn from "@/components/auth/authButton";
import {EnvelopeIcon, UserIcon} from "@heroicons/react/16/solid";
import SharedInput from "@/components/SharedInput";
import {KeyIcon} from "@heroicons/react/16/solid";
import Link from "next/link";
import AuthLayout from "@/components/auth/authLayout";

export default function Login() {
  const [state, action] = useFormState(formAction, null);

  return (
    <AuthLayout>
      <form action={action} className="flex flex-col gap-5 w-96">
        <SharedInput
          name="email"
          icon={<EnvelopeIcon className="size-6 text-gray-700" />}
          type="email"
          placeholder="Email"
          errMsg={state?.fieldErrors.email || []}
          required
        />
        <SharedInput
          name="username"
          icon={<UserIcon className="size-6 text-gray-700" />}
          type="text"
          placeholder="Username"
          errMsg={state?.fieldErrors.username || []}
          required
        />
        <SharedInput
          name="password"
          icon={<KeyIcon className="size-6 text-gray-700" />}
          type="text"
          placeholder="Password"
          errMsg={state?.fieldErrors.password || []}
          required
        />
        <AuthBtn btnTxt="Create Account" />
      </form>
      <div>
        <p className="text-white">
          Have account already?{" "}
          <Link href="/log_in" className="text-amber-400 hover:text-amber-200">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
