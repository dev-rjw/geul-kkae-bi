'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/Avatar';
import LineTitle from '@/components/LineTitle';
import { useAuth } from '@/queries/useAuth';
import { User } from '@/types/mypage';
import { fetchCurrentUserInfo } from '@/utils/user/client-action';
import DefaultButton from '@/components/DefaultButton';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import Swal from 'sweetalert2';

const MypageProfile = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User>();
  const { data } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      const email = data?.user_metadata.email;
      fetchCurrentUserInfo(email).then((elemant) => setUser(elemant));
    }
  }, [data]);

  const handleSignout = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('로그아웃에 실패했습니다.');
    } else {
      Swal.fire({
        html: `<div class="text-gray-700">로그아웃 되었습니다.</div>`,
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text',
          confirmButton: 'swal-custom-button',
        },
        confirmButtonText: '확인',
      });

      router.push('/');
    }
  };

  return (
    <>
      <div className='flex flex-col items-stretch min-w-[21.75rem] w-full lg:w-1/3 px-[2.375rem] py-8 bg-primary-400 rounded-3xl text-white'>
        <div className='flex justify-center mb-[2.5rem]'>
          <LineTitle
            className='text-[2rem] text-primary-50'
            lineClassName='bg-[#488CEE]'
          >
            MY PAGE
          </LineTitle>
        </div>

        {/* 프로필 이미지 */}
        <Avatar
          size='17rem'
          src={user?.image}
        />
        <div className='mt-[2.5rem] text-center'>
          <h2 className='text-[1.75rem] font-bold'>{user?.nickname ? user?.nickname : '닉네임'}</h2>
          <p className='text-[1.25rem] font-bold text-primary-200 mt-2'>{user?.email ? user?.email : '@email.com'}</p>
          <p className='text-[1.25rem] font-bold text-primary-100 mt-[1.125rem]'>
            {user?.introduction?.trim() ? user?.introduction?.trim() : '한 줄 소개가 없습니다.'}
          </p>
        </div>
        <div className='flex items-center justify-center gap-4 mt-[2.5rem]'>
          <DefaultButton
            asChild
            size='sm'
            className='min-w-[7rem] bg-primary-500'
          >
            <Link href='/mypage/information'>프로필 변경</Link>
          </DefaultButton>
          <DefaultButton
            asChild
            size='sm'
            className='min-w-[7rem] bg-primary-500'
          >
            <Link href='/mypage/change-password'>비밀번호 변경</Link>
          </DefaultButton>
        </div>
        <div className='mt-auto text-center'>
          <DefaultButton
            variant='text'
            className='text-white'
            onClick={handleSignout}
          >
            로그아웃
          </DefaultButton>
        </div>
      </div>
    </>
  );
};

export default MypageProfile;
