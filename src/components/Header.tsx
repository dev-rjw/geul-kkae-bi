import Image from 'next/image';
import React from 'react';
import Logo from '../img/logo.png';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Header = () => {
  return (
    <div className='ml-[20%] mr-[20%] mt-10 mb-5'>
      <Link href={'/'}>
        <Image
          src={Logo}
          width={150}
          height={150}
          alt='글깨비'
        ></Image>
      </Link>
      <Button className='float-right'>로그인</Button>
    </div>
  );
};

export default Header;
