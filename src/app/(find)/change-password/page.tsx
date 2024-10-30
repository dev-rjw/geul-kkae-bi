import React, { Suspense } from 'react';
import ChangePasswordForm from '../_components/ChangePasswordForm';

const FindPasswordPage = () => {
  return (
    <div className='max-w-96 mx-auto my-10'>
      <h2 className='text-2xl font-bold text-center mb-6'>비밀번호 변경</h2>
      <Suspense>
        <ChangePasswordForm />
      </Suspense>
    </div>
  );
};

export default FindPasswordPage;
