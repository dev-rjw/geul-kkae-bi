import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { addNickname, addProfileImage, addProvider } from '@/utils/user/server-action';
import { fetchCurrentUser } from '@/utils/auth/server-action';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';

      // 현재 사용자 조회
      const user = await fetchCurrentUser();
      if (error || !user) {
        console.error(error);
      }

      if (isLocalEnv) {
        if (user?.id) {
          await Promise.all([addNickname(user.id), addProfileImage(user.id), addProvider(user)]);
        }

        return NextResponse.redirect(`${origin}/auth/callback-client`);
      } else if (forwardedHost) {
        if (user?.id) {
          await Promise.all([addNickname(user.id), addProfileImage(user.id), addProvider(user)]);
        }

        return NextResponse.redirect(`https://${forwardedHost}/auth/callback-client`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
