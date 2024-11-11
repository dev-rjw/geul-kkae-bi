import { Metadata } from 'next';
import ChangePasswordForm from '@/app/(find)/_components/ChangePasswordForm';
import React, { Suspense } from 'react';
import Tabs from '../_components/Tabs';
import { fetchCurrentUser } from '@/utils/auth/server-action';
import { redirect } from 'next/navigation';
import DefaultButton from '@/components/DefaultButton';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: '마이페이지 - 비밀번호 변경',
  description: '마이페이지 - 비밀번호 변경',
};

const ChangePasswordPage = async () => {
  const user = await fetchCurrentUser();

  // 로그인 안했으면 로그인 페이지로
  if (!user?.id) {
    redirect('/signin');
  }

  return (
    <div className='container py-10'>
      <Tabs />
      <Suspense fallback={<Loader2 className='mr-2 h-4 w-4 animate-spin' />}>
        {user?.app_metadata?.provider === 'google' || user?.app_metadata?.provider === 'kakao' ? (
          <>
            <p className='body-20 text-center text-gray-700 mb-10'>
              소셜 로그인으로 접속하셨습니다. <br />
              비밀번호 없이 안전하게 서비스를 이용하실 수 있습니다.
            </p>
            <hr className='border-t-1 border-gray-200 my-[3.125rem]' />
            <div className='flex justify-center mt-[3.125rem]'>
              <DefaultButton
                asChild
                className='w-full max-w-[15rem]'
              >
                <Link href='/mypage'>확인</Link>
              </DefaultButton>
            </div>
          </>
        ) : (
          <div className='mt-5'>
            <ChangePasswordForm />
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default ChangePasswordPage;
