import { Metadata } from 'next';
import FindPasswordForm from '../_components/FindPasswordForm';
import { fetchCurrentUser } from '@/utils/auth/server-action';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '비밀번호 찾기',
  description: '비밀번호 찾기',
};

const FindPasswordPage = async () => {
  const user = await fetchCurrentUser();

  // 로그인했으면 메인으로
  if (user?.id) {
    redirect('/');
  }

  return (
    <div className='container py-[3.125rem]'>
      <h2 className='body-32 text-gray-700 mb-[0.625rem]'>비밀번호 찾기</h2>
      <hr className='border-t-2 border-gray-500 mb-10' />
      <p className='body-20 text-gray-700 mb-10'>
        가입하셨던 이메일을 적어주세요.
        <br />
        비밀번호 변경을 위한 메일을 발송해드려요.
      </p>
      <FindPasswordForm />
    </div>
  );
};

export default FindPasswordPage;
