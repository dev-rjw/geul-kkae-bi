import React, { Suspense } from 'react';
import ChangePasswordForm from '../_components/ChangePasswordForm';
import { fetchCurrentUser } from '@/utils/auth/server-action';
// import Swal from 'sweetalert2';
// import { redirect } from 'next/navigation';

const ChangePasswordPage = async () => {
  const user = await fetchCurrentUser();

  console.log(user);

  // if (user) {
  //   redirect('/');
  // }

  return (
    <div className='container py-[3.125rem]'>
      <h2 className='body-32 text-gray-700 mb-[0.625rem]'>비밀번호 찾기</h2>
      <hr className='border-t-2 border-gray-500 mb-10' />
      <Suspense>
        <ChangePasswordForm />
      </Suspense>
    </div>
  );
};

export default ChangePasswordPage;
