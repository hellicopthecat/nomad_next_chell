"use client";

import {addCommentAction} from "@/app/(afterLogin)/tweet/[id]/action";
import {useState} from "react";
import {useFormState} from "react-dom";

interface IAddComment {
  tweetId: number;
  optimisticFn: (payload: string) => void;
}
export default function AddComment({tweetId, optimisticFn}: IAddComment) {
  const [inputVal, setInputVal] = useState("");
  const [state, action] = useFormState(addCommentAction, {
    id: tweetId,
    errMsg: [],
  });

  return (
    <div className="flex flex-col gap-1">
      <form action={action} className="flex justify-between items-center">
        <input
          name="comment"
          type="text"
          onChange={({target}) => setInputVal(target.value + "")}
          placeholder="Comment..."
          className="px-4 py-1 rounded-md text-black"
        />
        <button onClick={() => optimisticFn(inputVal)}>확인</button>
      </form>
      {state.errMsg && (
        <span className="text-sm text-red-500">{state.errMsg[0]}</span>
      )}
    </div>
  );
}
