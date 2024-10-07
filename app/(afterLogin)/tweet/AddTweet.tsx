"use client";

import {useFormState} from "react-dom";
import addTweetAction from "./action";
import FormBtn from "@/components/formButton";

export default function AddTweet() {
  const [state, formAction] = useFormState(addTweetAction, null);
  return (
    <form action={formAction} className="flex items-center gap-5">
      <div>
        <div>
          <label htmlFor="tweet"></label>
          <input
            id="tweet"
            name="tweet"
            type="text"
            placeholder="트윗을 작성해보세요!"
            className="pl-5 py-1 rounded-md text-black"
          />
        </div>
        {state?._errors &&
          state._errors.map((error, index) => (
            <span key={index} className="text-red-500">
              {error}
            </span>
          ))}
      </div>
      <FormBtn btnTxt="작성" className="px-4" />
    </form>
  );
}
