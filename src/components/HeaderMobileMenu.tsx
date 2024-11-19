import MyProfileInfo from './MyProfileInfo';
import { House, UserRound, Gamepad2, LogOut, Medal, BookA, BookOpenCheck } from 'lucide-react';
import { useAuth } from '@/queries/useAuth';
import { useSignout } from '@/utils/sign/signout';
import { HeaderMobileMenuData } from '@/types/header';
import { Button } from './ui/button';
import HeaderMobileMenuItem from './HeaderMobileMenuItem';

const HEADER_MOBILE_MENU_DATA: HeaderMobileMenuData[] = [
  {
    id: 1,
    icon: House,
    title: 'HOME',
    link: '/',
  },
  {
    id: 2,
    icon: Gamepad2,
    title: '깨비게임',
    link: '/games/speaking',
    children: [
      {
        title: '나야, 발음왕',
        link: '/games/speaking',
      },
      {
        title: '틀린 말 탐정단',
        link: '/games/checking',
      },
      {
        title: '빈칸 한 입',
        link: '/games/writing',
      },
    ],
  },
  {
    id: 3,
    icon: BookA,
    title: '학습카드',
    link: '/learning',
  },
  {
    id: 4,
    icon: BookOpenCheck,
    title: '오답모아',
    link: '/wronganswer/speaking',
    children: [
      {
        title: '나야, 발음왕',
        link: '/wronganswer/speaking',
      },
      {
        title: '틀린 말 탐정단',
        link: '/wronganswer/checking',
      },
      {
        title: '빈칸 한 입',
        link: '/wronganswer/writing',
      },
    ],
  },
  {
    id: 5,
    icon: Medal,
    title: '랭킹',
    link: '/games/rank',
  },
  {
    id: 6,
    icon: UserRound,
    title: '마이페이지',
    link: '/mypage',
    children: [
      {
        title: '프로필 변경',
        link: '/mypage/information',
      },
      {
        title: '비밀번호 변경',
        link: '/mypage/change-password',
      },
    ],
  },
];

const HeaderMobileMenu = () => {
  const { data: user } = useAuth();
  const { handleSignout } = useSignout();

  return (
    <div className='heaber-moblie-menu'>
      {user && (
        <>
          <MyProfileInfo />
          <div className='h-[0.375rem] bg-primary-50 border-t-2 border-primary-100' />
        </>
      )}

      <div className='grow p-3'>
        <ul className='flex flex-col gap-1'>
          {HEADER_MOBILE_MENU_DATA.map((item) =>
            item.link === '/mypage' && !user ? null : (
              <HeaderMobileMenuItem
                key={item.id}
                item={item}
              />
            ),
          )}
        </ul>
      </div>
      {user && (
        <>
          <div className='h-[0.375rem] bg-primary-50 border-t-2 border-primary-100 mt-auto' />
          <Button
            className='flex gap-[0.375rem] px-4 py-[0.625rem] w-full h-[2.375rem] justify-start text-xs font-bold rounded-none text-gray-600 bg-white hover:bg-secondary-50'
            onClick={handleSignout}
          >
            <LogOut className='text-base' />
            로그아웃
          </Button>
        </>
      )}
    </div>
  );
};

export default HeaderMobileMenu;
