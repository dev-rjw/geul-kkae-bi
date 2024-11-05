'use client';

import Image from 'next/image';
import DefaultButton from '@/components/DefaultButton';
import { kakaoSignin } from '@/util/auth/client-action';

const KakaoSignButtton = () => {
  return (
    <DefaultButton
      className='relative w-full bg-[#FDDC3F] text-gray-700 hover:bg-[#DCB707] hover:text-gray-700'
      onClick={kakaoSignin}
    >
      <Image
        src='icon_kakao.svg'
        width={24}
        height={24}
        alt='카카오 아이콘'
        className='absolute top-1/2 -translate-y-1/2 left-6'
      />
      카카오로 시작하기
    </DefaultButton>
  );
};

export default KakaoSignButtton;
