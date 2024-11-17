'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { HeaderData } from '@/types/header';
import HeaderInfoChange from './HeaderInfoChange';
import HeaderPCMenu from './HeaderPCMenu';
import HeaderMobileMenu from './HeaderMobileMenu';
import { Button } from './ui/button';
import { ChevronLeft, House, Share } from 'lucide-react';

const commonStyle: HeaderData = {
  title: '',
  pcVisible: 'flex',
  mobileVisible: 'flex',
  headerClassName: '',
  titleClassName: '',
};

const HEADER_DATA: { [key: string]: HeaderData } = {
  '/': {
    ...commonStyle,
    title: '홈',
  },
  '/signin': {
    ...commonStyle,
    title: '로그인',
    pcVisible: 'hidden',
  },
  '/signup': {
    ...commonStyle,
    title: '회원가입',
  },
  '/mypage': {
    ...commonStyle,
    title: '마이페이지',
    headerClassName: 'max-md:bg-primary-400 max-md:text-white',
    titleClassName: 'max-md:text-white',
  },
  '/mypage/information': {
    ...commonStyle,
    title: '프로필 변경',
  },
  '/mypage/change-password': {
    ...commonStyle,
    title: '비밀번호 변경',
  },
  '/find-password': {
    ...commonStyle,
    title: '비밀번호 찾기',
  },
  '/change-password': {
    ...commonStyle,
    title: '비밀번호 변경',
  },
  '/games/speaking': {
    ...commonStyle,
    title: '나야, 발음왕',
    pcVisible: 'hidden',
  },
  '/games/checking': {
    ...commonStyle,
    title: '틀린 말 탐정단',
    pcVisible: 'hidden',
  },
  '/games/writing': {
    ...commonStyle,
    title: '빈칸 한 입',
    pcVisible: 'hidden',
  },
  '/learning': {
    ...commonStyle,
    title: '학습카드',
  },
  '/answer': {
    ...commonStyle,
    title: '오답모아',
  },
  '/games/rank': {
    ...commonStyle,
    title: '랭킹',
  },
};

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const header = HEADER_DATA[pathname] || commonStyle;
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerBtnRef = useRef<HTMLDivElement>(null);
  const backPaths = [
    '/signin',
    '/signup',
    '/find-password',
    '/change-password',
    '/games/speaking',
    '/games/checking',
    '/games/writing',
    '/mypage',
    '/mypage/information',
    '/mypage/change-password',
    '/games/rank',
    '/learning',
    '/answer',
  ];
  const infoPaths = ['/'];
  const homePaths = ['/games/rank'];
  const sharePaths = ['/games/speaking', '/games/checking', '/games/writing'];
  const gamePaths = ['/games/speaking', '/games/checking', '/games/writing'];
  const getGameClass = (pathname: string): string => {
    if (pathname.includes('speaking')) {
      return 'heaber-moblie-title-speaking';
    } else if (pathname.includes('checking')) {
      return 'heaber-moblie-title-checking';
    } else if (pathname.includes('writing')) {
      return 'heaber-moblie-title-writing';
    }
    return ''; // 기본 클래스는 빈 문자열
  };

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  }, [pathname]);

  // 모바일 메뉴 외부 클릭 감지
  const handleOutsideClick = (e: MouseEvent) => {
    if (
      hamburgerBtnRef.current &&
      !hamburgerBtnRef.current.contains(e.target as Node) &&
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(e.target as Node)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [menuOpen]);

  const toggleMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className={`header ${header.pcVisible} max-md:${header.mobileVisible} ${menuOpen ? 'menu-open' : ''} ${
          header.headerClassName
        }`}
      >
        <div className='container'>
          <div className='flex items-center justify-between'>
            <div className='header-mobile-left'>
              {backPaths.includes(pathname) ? (
                <Button
                  size='icon'
                  className='w-[3.125rem] h-[3.125rem] bg-transparent text-[currentColor] rounded-none hover:bg-transparent [&_svg]:size-6'
                  onClick={() => router.back()}
                >
                  <ChevronLeft />
                </Button>
              ) : (
                <div
                  className='hamburger-btn hidden max-md:inline-flex'
                  ref={hamburgerBtnRef}
                  onClick={toggleMenu}
                >
                  <span></span>
                </div>
              )}
            </div>

            <Link
              href='/'
              className='relative flex items-center w-[11.5rem] aspect-[190/62] max-lg:w-[8.75rem] max-md:hidden'
            >
              <Image
                src='/logo.svg'
                alt='Profile'
                fill
                sizes='100%'
              />
            </Link>

            <div className='grow flex items-center pl-[5.75rem] max-xl:pl-0 max-xl:justify-center max-md:hidden'>
              <HeaderPCMenu />
            </div>
            <div
              className='hidden max-md:flex'
              ref={mobileMenuRef}
            >
              <HeaderMobileMenu />
            </div>

            <div className='hidden max-md:flex items-center justify-center absolute top-0 left-1/2 -translate-x-1/2 w-full h-[3.125rem] px-14'>
              {pathname === '/' ? (
                <Link href='/'>
                  <Image
                    src='/logo.svg'
                    width={84}
                    height={26}
                    alt='글깨비'
                  ></Image>
                </Link>
              ) : gamePaths.includes(pathname) ? (
                <span className={getGameClass(pathname)}>{header.title}</span>
              ) : (
                <span className={`body-18 text-gray-700 ${header.titleClassName}`}>{header.title}</span>
              )}
            </div>

            <div className='max-md:hidden'>
              <HeaderInfoChange />
            </div>
            <div className='header-mobile-right'>
              {infoPaths.includes(pathname) && (
                <div className='pr-4'>
                  <HeaderInfoChange />
                </div>
              )}
              {homePaths.includes(pathname) && (
                <Button
                  asChild
                  size='icon'
                  className='w-[3.125rem] h-[3.125rem] bg-transparent text-gray-700 rounded-none hover:bg-transparent [&_svg]:size-6'
                >
                  <Link href='/'>
                    <House />
                  </Link>
                </Button>
              )}
              {sharePaths.includes(pathname) && (
                <Button
                  size='icon'
                  className='w-[3.125rem] h-[3.125rem] bg-transparent text-gray-700 rounded-none hover:bg-transparent [&_svg]:size-6'
                >
                  <Share />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
