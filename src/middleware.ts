// import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from './util/supabase/middleware';
// import { createClient, getIsLogin } from './utils/supabase/server';
export async function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname.includes('/schedule')) {
  //   const isLogin = await getIsLogin();
  //   if (!isLogin) {
  //     return NextResponse.redirect(new URL('/login', request.url));
  //   }
  // }
  await updateSession(request);
}
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
