'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, House, Share } from 'lucide-react';
import { HeaderData } from '@/types/header';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import HeaderInfoChange from './HeaderInfoChange';
import HeaderPCMenu from './HeaderPCMenu';
import HeaderMobileMenu from './HeaderMobileMenu';
import kakaoTalkShare from '@/app/games/(result)/_components/kakaoTalkShare';
import LinkCopyButton from '@/app/games/(result)/_components/LinkCopyButton';
import { useAuth } from '@/queries/useAuth';
import { useUser } from '@/queries/useUser';

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
  '/wronganswer': {
    ...commonStyle,
    title: '오답모아',
  },
  '/games/rank': {
    ...commonStyle,
    title: '랭킹',
    headerClassName: 'max-md:bg-primary-100',
  },
  '/share/url': {
    ...commonStyle,
    title: '공유하기',
    pcVisible: 'hidden',
  },
};

const Header = () => {
  const { data } = useAuth();
  const email = data?.user_metadata.email;
  const { data: user } = useUser(email);
  const nickname = user?.nickname;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const key = searchParams.get('key');
  const score = searchParams.get('score');
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
  // const sharePaths = [''];
  const gamePaths = ['/games/speaking', '/games/checking', '/games/writing'];

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

  const getGameClass = (pathname: string): string => {
    if (pathname.includes('/games/user') || pathname.includes('/games/guest')) {
      if (key === 'speaking') return 'heaber-moblie-title-speaking';
      if (key === 'checking') return 'heaber-moblie-title-checking';
      if (key === 'writing') return 'heaber-moblie-title-writing';
    }
    if (pathname.includes('/games/speaking')) return 'heaber-moblie-title-speaking';
    if (pathname.includes('/games/checking')) return 'heaber-moblie-title-checking';
    if (pathname.includes('/games/writing')) return 'heaber-moblie-title-writing';

    // 기본값
    return '';
  };
  const getTitle = (pathname: string) => {
    if (pathname.includes('/games/user') || pathname.includes('/games/guest')) {
      if (key === 'speaking') {
        return '나야, 발음왕';
      } else if (key === 'checking') {
        return '틀린 말 탐정단';
      } else if (key === 'writing') {
        return '빈칸 한 입';
      }
    }
    return header.title;
  };
  const gameClass = getGameClass(pathname);
  const gameTitle = getTitle(pathname);

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
              ) : gamePaths.includes(pathname) || gameClass ? (
                <span className={gameClass}>{gameTitle}</span>
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
              {gameClass && (
                <Popover>
                  <PopoverTrigger className='flex items-center justify-center w-[3.125rem] h-[3.125rem] bg-transparent text-gray-700 rounded-none hover:bg-transparent [&_svg]:size-6'>
                    <Share />
                  </PopoverTrigger>
                  <PopoverContent
                    className='w-[16.125rem] rounded-[1.25rem] border-0 px-0 pt-0 pb-4 overflow-hidden'
                    style={{ boxShadow: '0 0 4px rgba(0,0,0,0.25)' }}
                  >
                    <div className='body-18 text-center text-primary-500 p-4'>
                      결과페이지를
                      <br />
                      친구에게 공유해보세요!
                    </div>
                    <div className='h-1 bg-gray-100 border-t border-gray-200' />
                    <div className='flex flex-col'>
                      <Button
                        className='flex items-center justify-start gap-2 h-11 text-lg font-bold text-gray-600 px-4 py-2 rounded-none bg-transparent hover:bg-primary-50'
                        onClick={kakaoTalkShare}
                      >
                        <div className='relative aspect-square w-7 rounded-full'>
                          <Image
                            src={`/icon_kakao@2x.png`}
                            alt='카카오 아이콘'
                            fill
                            className='object-fill'
                          />
                        </div>
                        카카오톡으로 공유하기
                      </Button>
                      <LinkCopyButton
                        url={`https://geul-kkae-bi.vercel.app/share/url?key=${key}&score=${score}&nickname=${nickname}`}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
