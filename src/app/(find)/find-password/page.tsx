import React from 'react';
import FindPasswordForm from '../_components/FindPasswordForm';
import { fetchCurrentUser } from '@/utils/auth/server-action';
import { redirect } from 'next/navigation';

const FindPasswordPage = async () => {
  const user = await fetchCurrentUser();

  if (user) {
    redirect('/');
  }

  return (
    <div className='max-w-96 mx-auto my-10'>
      <h2 className='text-2xl font-bold text-center mb-6'>비밀번호 찾기</h2>
      <p>가입하신 이메일을 입력하시면 비밀번호 변경을 위한 메일을 발송해드리겠습니다.</p>
      <FindPasswordForm />
    </div>
  );
};

export default FindPasswordPage;
