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

  if (user?.id) {
    redirect('/');
  }

  return (
    <div className='container min-h-screen flex py-16 max-md:py-10'>
      <div className='w-full max-w-[23.875rem] m-auto max-sm:max-w-[24.875rem] max-md:my-0'>
        <div className='flex justify-center mb-16 max-md:mb-[3.75rem]'>
          <Link
            href='/'
            className='relative flex items-center w-[16.375rem] aspect-[190/62] max-lg:w-[11.875rem]'
          >
            <Image
              src='/logo.svg'
              alt='글깨비'
              fill
              sizes='16.375rem'
              priority
            />
          </Link>
        </div>

        <SigninForm />

        <div className='mt-16 max-md:mt-11'>
          <div className='line-title mb-8 max-md:mb-6'>
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
