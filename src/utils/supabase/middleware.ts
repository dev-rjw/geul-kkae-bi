import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          },
        },
      },
    );
    await supabase.auth.getUser();
    return response;
  } catch (e) {
    console.log(e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};