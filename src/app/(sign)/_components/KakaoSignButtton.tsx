'use client';

import Image from 'next/image';
import Swal from 'sweetalert2';
import { kakaoSignin } from '@/utils/auth/client-action';
import DefaultButton from '@/components/DefaultButton';

const KakaoSignButtton = () => {
  const handleKakaoSignin = async () => {
    const result = await kakaoSignin();

    if (result instanceof Error) {
      Swal.fire({
        html: `<div class="text-gray-700">로그인에 실패하였습니다.</div>`,
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text',
          confirmButton: 'swal-custom-button',
        },
        confirmButtonText: '확인',
      });
    }
  };

  return (
    <DefaultButton
      className='relative w-full bg-[#FDDC3F] text-gray-700 hover:bg-[#DCB707] hover:text-gray-700'
      onClick={handleKakaoSignin}
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
