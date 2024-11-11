import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
// 서버 측 인증 지침에서 생성한 클라이언트
import { addNickname, addProfileImage, addProvider } from '@/utils/user/server-action';
import { fetchCurrentUser } from '@/utils/auth/server-action';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // "next"이 매개 변수인 경우 리디렉션 URL로 사용합니다
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host'); // 로드 밸런서 이전의 원래 원점
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

        return NextResponse.redirect(`${origin}/auth/callback-client`);
      } else if (forwardedHost) {
        // 닉네임, 프로필 이미지, Provider 추가
        if (user?.id) {
          await addNickname(user.id);
          await addProfileImage(user.id);
          await addProvider(user);
        }

        return NextResponse.redirect(`${origin}/auth/callback-client`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // 사용자를 지침이 있는 오류 페이지로 되돌립니다
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
