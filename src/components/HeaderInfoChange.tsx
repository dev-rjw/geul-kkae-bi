'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/util/supabase/client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/queries/useAuth';

const HeaderInfoChange = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const router = useRouter();

  // useAuth을 통해 로그인 상태 확인
  const { data: auth, isLoading } = useAuth();

  // auth 변화 감지
  supabase.auth.onAuthStateChange(() => {
    queryClient.invalidateQueries({ queryKey: ['user', 'client'] });
  });

  const signout = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('로그아웃에 실패했습니다.');
    } else {
      alert('로그아웃 되었습니다.');
      router.push('/');
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 상태 처리
  }

  return (
    <>
      {auth ? (
        <div className='flex items-center gap-6 justify-end'>
          <Link href='/mypage'>마이페이지</Link>
          <Button onClick={signout}>로그아웃</Button>
        </div>
      ) : (
        <div className='flex items-center gap-6 justify-end'>
          <Link href='/signin'>로그인</Link>
          <Link href='/signup'>회원가입</Link>
        </div>
      )}
    </>
  );
};

export default HeaderInfoChange;
