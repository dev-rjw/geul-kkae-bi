'use client';

import { Button } from '@/components/ui/button';
import { googleSignin } from '@/util/auth/client-action';

const GoogleSignButton = () => {
  return (
    <Button
      className='w-full'
      onClick={googleSignin}
    >
      구글 로그인
    </Button>
  );
};

export default GoogleSignButton;
