import { Metadata } from 'next';
import SignForm from '../_components/SignForm';

export const metadata: Metadata = {
  title: '회원가입',
  description: '회원가입',
};

const SignupPage = () => {
  return (
    <div className='max-w-96 mx-auto my-10'>
      <h2 className='text-2xl font-bold text-center mb-6'>회원가입</h2>
      <SignForm />
    </div>
  );
};

export default SignupPage;
