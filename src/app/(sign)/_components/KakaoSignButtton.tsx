'use client';

import { Button } from '@/components/ui/button';
import { kakaoSignin } from '@/utils/auth/client-action';

const KakaoSignButtton = () => {
  return (
    <Button
      className='w-full bg-yellow-400 hover:bg-yellow-500'
      onClick={kakaoSignin}
    >
      카카오 로그인
    </Button>
  );
};

export default KakaoSignButtton;
