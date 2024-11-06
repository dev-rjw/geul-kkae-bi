import Link from 'next/link';
import HeaderInfoChange from './HeaderInfoChange';
import Image from 'next/image';

const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full h-20 bg-secondary-50 flex items-center'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <Link href='/'>
            <Image
              src='/logo.svg'
              width={185}
              height={60}
              alt='글깨비'
            ></Image>
          </Link>
          <HeaderInfoChange />
        </div>
      </div>
    </header>
  );
};

export default Header;
