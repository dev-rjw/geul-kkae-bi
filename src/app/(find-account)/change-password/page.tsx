import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ChangePasswordForm from '../_components/ChangePasswordForm';
import { fetchCurrentUser } from '@/utils/auth/server-action';
import { redirect } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: '비밀번호 찾기',
  description: '비밀번호 찾기',
};

const ChangePasswordPage = async () => {
  const user = await fetchCurrentUser();

  if (user?.id) {
    redirect('/');
  }

  return (
    <div className='container py-[3.125rem] max-md:pt-9'>
      <h2 className='body-32 text-gray-700 mb-[0.625rem] max-md:hidden'>비밀번호 찾기</h2>
      <hr className='border-t-2 border-gray-500 mb-10 max-md:hidden' />
      <Suspense fallback={<Loader2 className='mr-2 h-4 w-4 animate-spin' />}>
        <ChangePasswordForm />
      </Suspense>
    </div>
  );
};

export default ChangePasswordPage;
