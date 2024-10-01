import {ReactNode} from "react";

export default function AuthLayout({children}: {children: ReactNode}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-20">
      {children}
    </div>
  );
}
