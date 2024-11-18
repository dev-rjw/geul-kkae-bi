import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { fetchCurrentUser } from '@/utils/auth/server-action';
import Tabs from '../_components/Tabs';
import DefaultButton from '@/components/DefaultButton';
import ChangePasswordForm from '@/app/(find-account)/_components/ChangePasswordForm';

export const metadata: Metadata = {
  title: '마이페이지 - 비밀번호 변경',
  description: '마이페이지 - 비밀번호 변경',
};

const ChangePasswordPage = async () => {
  const user = await fetchCurrentUser();

  if (!user?.id) {
    redirect('/signin');
  }

  return (
    <div className='container py-10 max-md:pt-[0.625rem]'>
      <Tabs />
      <Suspense fallback={<Loader2 className='mr-2 h-4 w-4 animate-spin' />}>
        {user?.app_metadata?.provider === 'google' || user?.app_metadata?.provider === 'kakao' ? (
          <div className='max-md:mt-12'>
            <p className='body-20 text-center text-gray-700 mb-10'>
              소셜 로그인으로 접속하셨습니다. <br />
              비밀번호 없이 안전하게 서비스를 이용하실 수 있습니다.
            </p>
            <hr className='border-t-1 border-gray-200 my-[3.125rem] max-md:hidden' />
            <div className='flex justify-center mt-[3.125rem] max-md:mt-[5rem]'>
              <DefaultButton
                asChild
                className='w-full max-w-[15rem] max-md:max-w-none'
              >
                <Link href='/mypage'>돌아가기</Link>
              </DefaultButton>
            </div>
          </div>
        ) : (
          <div className='mt-5 max-md:mt-4'>
            <ChangePasswordForm />
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default ChangePasswordPage;
