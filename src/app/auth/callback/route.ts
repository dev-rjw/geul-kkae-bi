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
        // 닉네임, 프로필 이미지, Provider 추가
        if (user?.id) {
          await addNickname(user.id);
          await addProfileImage(user.id);
          await addProvider(user);
        }

        return NextResponse.redirect(`/auth/callback-client`);
      } else if (forwardedHost) {
        // 닉네임, 프로필 이미지, Provider 추가
        if (user?.id) {
          await addNickname(user.id);
          await addProfileImage(user.id);
          await addProvider(user);
        }

        return NextResponse.redirect(`/auth/callback-client`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
