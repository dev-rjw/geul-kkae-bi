import { Metadata } from 'next';
import SigninForm from '../_components/SigninForm';
import Link from 'next/link';
import GoogleSignButton from '../_components/GoogleSignButton';
import KakaoSignButtton from '../_components/KakaoSignButtton';
import { fetchCurrentUser } from '@/util/auth/server-action';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '로그인',
  description: '로그인',
};

const SigninPage = async () => {
  const user = await fetchCurrentUser();

  if (user) {
    redirect('/');
  }

  return (
    <div className='container min-h-screen flex py-16'>
      <div className='w-full max-w-[23.875rem] m-auto'>
        <div className='flex mb-16'>
          <Link
            href='/'
            className='mx-auto'
          >
            <Image
              src='/logo_kkaebi.svg'
              width={262}
              height={82}
              alt='글깨비'
            ></Image>
          </Link>
        </div>
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
    </div>
  );
};

export default SigninPage;
