'use client';

import Image from 'next/image';
import Swal from 'sweetalert2';
import { googleSignin } from '@/utils/auth/client-action';
import DefaultButton from '@/components/DefaultButton';

const GoogleSignButton = () => {
  const handleGoogleSignin = async () => {
    const result = await googleSignin();

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
      className='relative w-full bg-[#F2F2F2] text-gray-700 hover:bg-gray-200 hover:text-gray-700'
      onClick={handleGoogleSignin}
    >
      <Image
        src='icon_google.svg'
        width={24}
        height={24}
        alt='구글아이콘'
        className='absolute top-1/2 -translate-y-1/2 left-6'
      />
      구글로 시작하기
    </DefaultButton>
  );
};

export default GoogleSignButton;
