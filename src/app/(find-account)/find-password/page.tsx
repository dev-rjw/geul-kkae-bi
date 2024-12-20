import { Suspense } from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { fetchCurrentUser } from '@/utils/auth/server-action';
import FindPasswordForm from '../_components/FindPasswordForm';

export const metadata: Metadata = {
  title: '비밀번호 찾기',
  description: '비밀번호 찾기',
};

const FindPasswordPage = async () => {
  const user = await fetchCurrentUser();

  if (user?.id) {
    redirect('/');
  }

  return (
    <div className='container py-[3.125rem] max-md:pt-10'>
      <h2 className='body-32 text-gray-700 mb-[0.625rem] max-md:hidden'>비밀번호 찾기</h2>
      <hr className='border-t-2 border-gray-500 mb-10 max-md:hidden' />
      <p className='body-20 text-gray-700 mb-10 max-md:body-18 max-md:text-center'>
        가입하셨던 이메일을 적어주세요.
        <br />
        비밀번호 변경을 위한 메일을 발송해드려요.
      </p>
      <Suspense fallback={<Loader2 className='mr-2 h-4 w-4 animate-spin' />}>
        <FindPasswordForm />
      </Suspense>
    </div>
  );
};

export default FindPasswordPage;
