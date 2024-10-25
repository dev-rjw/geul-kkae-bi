import Link from 'next/link';
import HeaderInfoChange from './HeaderInfoChange';

const Header = () => {
  return (
    <header>
      <div className='flex items-center justify-between max-w-[1000px] mx-auto my-10'>
        <Link href='/'>로고</Link>
        <HeaderInfoChange />
      </div>
    </header>
  );
};

export default Header;
