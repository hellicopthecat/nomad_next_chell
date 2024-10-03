"use client";

import {ArrowLeftIcon} from "@heroicons/react/16/solid";
import {useRouter} from "next/navigation";

export default function BackBtn() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
      <ArrowLeftIcon className="size-5" />
    </button>
  );
}
