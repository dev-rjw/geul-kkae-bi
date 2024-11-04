import { Metadata } from 'next';
import SigninForm from '../_components/SigninForm';
import Link from 'next/link';
import GoogleSignButton from '../_components/GoogleSignButton';
import KakaoSignButtton from '../_components/KakaoSignButtton';

export const metadata: Metadata = {
  title: '로그인',
  description: '로그인',
};

const SigninPage = () => {
  return (
    <div className='max-w-96 mx-auto my-10'>
      <h2 className='font-yangjin text-2xl font-bold text-center mb-6'>로그인</h2>
      <SigninForm />
      <div className='mt-5'>
        <ul className='w-full flex gap-2 items-center justify-around'>
          <li>
            <Link href='/find-password'>비밀번호 찾기</Link>
          </li>
          <li>
            <Link href='/signup'>회원가입</Link>
          </li>
        </ul>
      </div>
      <div className='mt-10'>
        <ul className='w-full flex flex-col gap-2'>
          <li>
            <GoogleSignButton />
          </li>
          <li>
            <KakaoSignButtton />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SigninPage;
