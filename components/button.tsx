import {useFormStatus} from "react-dom";

export default function LoginBtn() {
  const {pending} = useFormStatus();
  return (
    <button
      disabled={pending}
      className="font-bold py-3 
      disabled:bg-gray-500 bg-gray-100
      disabled:text-white
    rounded-full"
    >
      {pending ? "Loading..." : "Log In"}
    </button>
  );
}
