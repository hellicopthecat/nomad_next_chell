"use client";
import {useFormStatus} from "react-dom";
interface IAuthBtnProps {
  btnTxt: string;
}
export default function AuthBtn({btnTxt}: IAuthBtnProps) {
  const {pending} = useFormStatus();
  return (
    <button
      disabled={pending}
      className="font-bold py-3 
      disabled:bg-gray-500 bg-gray-100
      disabled:text-white
    rounded-full"
    >
      {pending ? "Loading..." : btnTxt}
    </button>
  );
}
