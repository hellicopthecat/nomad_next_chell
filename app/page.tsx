"use client";

import {useFormState} from "react-dom";
import formAction from "./actions";
import LoginBtn from "@/components/button";
const initalState = {
  success: null,
  email: "",
  username: "",
  password: "",
};
export default function Home() {
  const [state, action] = useFormState(formAction, initalState);

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-20">
      <form action={action} className="flex flex-col gap-5 w-96">
        <div className="flex items-center relative">
          <label htmlFor="email" className="absolute left-2">
            <svg
              className="fill-gray-700 size-6"
              fill="none"
              strokeWidth={1.5}
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
          </label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            className="pl-10 py-2 border rounded-full w-full focus:ring-2 focus:ring-offset-4 focus:ring-gray-200 outline-none"
          />
        </div>
        {state.email && <span className="text-red-400">{state.email}</span>}
        <div className="flex items-center relative">
          <label htmlFor="username" className="absolute left-2">
            <svg
              className="fill-gray-700 size-6"
              fill="none"
              strokeWidth={1.5}
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="UserName"
            className="pl-10 py-2 border rounded-full w-full focus:ring-2 focus:ring-offset-4 focus:ring-gray-200 outline-none"
          />
        </div>
        {state.username && (
          <span className="text-red-400">{state.username}</span>
        )}
        <div className="flex items-center relative">
          <label htmlFor="password" className="absolute left-2">
            <svg
              className="fill-gray-700 size-6"
              fill="none"
              strokeWidth={1.5}
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
            </svg>
          </label>
          <input
            id="password"
            name="password"
            type="text"
            placeholder="Password"
            className={`pl-10 py-2 border rounded-full w-full focus:ring-2 focus:ring-offset-4 ${
              state.password !== ""
                ? "focus:ring-red-500"
                : "focus:ring-gray-200"
            }
          invalid:focus:ring-red-500 focus:ring-gray-200
             outline-none`}
          />
        </div>
        {state.password && (
          <span className="text-red-400">{state.password}</span>
        )}
        <LoginBtn />

        {state.success && (
          <div className="flex justify-center items-center gap-3 bg-green-300 w-full py-3 rounded-lg">
            <svg
              className="fill-green-500 size-5"
              fill="none"
              strokeWidth={1.5}
              stroke="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h2>Success!</h2>
          </div>
        )}
      </form>
    </div>
  );
}
