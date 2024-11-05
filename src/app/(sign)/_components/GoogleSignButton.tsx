'use client';

import Image from 'next/image';
import DefaultButton from '@/components/DefaultButton';
import { googleSignin } from '@/utils/auth/client-action';

const GoogleSignButton = () => {
  return (
    <DefaultButton
      className='relative w-full bg-[#F2F2F2] text-gray-700 hover:bg-gray-200'
      onClick={googleSignin}
    >
      <Image
        src='icon_google.svg'
        width={24}
        height={24}
        alt='구글아이콘'
        className='absolute top-2/4 -translate-y-2/4 left-6'
      />
      구글로 시작하기
    </DefaultButton>
  );
};

export default GoogleSignButton;
