"use client";
import {useFormStatus} from "react-dom";
interface IAuthBtnProps {
  btnTxt: string;
  className?: string;
}
export default function FormBtn({btnTxt, className}: IAuthBtnProps) {
  const {pending} = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`${className} font-bold py-3 
      disabled:bg-gray-500 bg-slate-400 hover:bg-slate-500
      disabled:text-white
    rounded-xl`}
    >
      {pending ? "Loading..." : btnTxt}
    </button>
  );
}
