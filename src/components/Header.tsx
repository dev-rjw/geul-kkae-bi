import Link from 'next/link';
import HeaderInfoChange from './HeaderInfoChange';
import Image from 'next/image';
import Logo from '../img/logo.png';

const Header = () => {
  return (
    <header>
      <div className='flex items-center justify-between max-w-[1000px] mx-auto my-10'>
        <Link href='/'>
          <Image
            src={Logo}
            width={150}
            height={150}
            alt='글깨비'
          ></Image>
        </Link>
        <HeaderInfoChange />
      </div>
    </header>
  );
};

export default Header;
