import { Metadata } from 'next';
import '../style.css';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import GoogleSignButton from '../_components/GoogleSignButton';
import KakaoSignButtton from '../_components/KakaoSignButtton';
import { fetchCurrentUser } from '@/utils/auth/server-action';
import SigninForm from '../_components/SigninForm';

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

        <div className='mt-16'>
          <div className='line-title mb-8'>
            <span>간편로그인</span>
          </div>
          <ul className='w-full flex flex-col gap-3'>
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
