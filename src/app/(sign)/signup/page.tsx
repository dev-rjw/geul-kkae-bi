import { Metadata } from 'next';
import SignupForm from '../_components/SignupForm';
import { fetchCurrentUser } from '@/util/auth/server-action';
import { redirect } from 'next/navigation';
export const metadata: Metadata = {
  title: '회원가입',
  description: '회원가입',
};

const SignupPage = async () => {
  const user = await fetchCurrentUser();

  if (user) {
    redirect('/');
  }

  return (
    <div className='max-w-[898px] mx-auto my-10'>
      <h2 className='text-2xl font-bold text-center mb-6'>회원가입</h2>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
