import { Metadata } from 'next';
import SignupForm from '../_components/SignupForm';

export const metadata: Metadata = {
  title: '로그인',
  description: '로그인',
};

const SigninPage = () => {
  return (
    <div className='max-w-96 mx-auto my-10'>
      <h2 className='text-2xl font-bold text-center mb-6'>로그인</h2>
      <SignupForm />
    </div>
  );
};

export default SigninPage;
