import getSession from "@/libs/session";
import {NextRequest, NextResponse} from "next/server";
interface IPublicUrl {
  [key: string]: boolean;
}
const publicUrl: IPublicUrl = {
  "/log_in": true,
  "/create_account": true,
};
export async function middleware(request: NextRequest) {
  const session = await getSession();
  const existsUrl = publicUrl[request.nextUrl.pathname];

  if (!session.id) {
    if (!existsUrl) {
      return NextResponse.redirect(new URL("/log_in", request.url));
    }
  } else {
    if (existsUrl) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
