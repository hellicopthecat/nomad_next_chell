import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 w-96 border rounded-md p-10 mx-auto *:text-white ">
      <h1>HELLO. Welcome</h1>
      <Link href="/log_in" className="bg-amber-500 p-2 rounded-md text-center">
        로그인
      </Link>
      <Link
        href="/create_account"
        className="bg-amber-500 p-2 rounded-md text-center"
      >
        회원가입
      </Link>
    </div>
  );
}
