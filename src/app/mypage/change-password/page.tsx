import ChangePasswordForm from '@/app/(find)/_components/ChangePasswordForm';
import React, { Suspense } from 'react';
import Tabs from '../_components/Tabs';

const ChangePasswordPage = () => {
  return (
    <div className='container py-[2.5rem]'>
      <Tabs />
      <Suspense>
        <div className='mt-5'>
          <ChangePasswordForm />
        </div>
      </Suspense>
    </div>
  );
};

export default ChangePasswordPage;
