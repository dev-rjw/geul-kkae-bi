import MyProfileInfo from './MyProfileInfo';
import { House, UserRound, Gamepad2, BookCopy, NotebookText, Award, LogOut } from 'lucide-react';
import { useAuth } from '@/queries/useAuth';
import { useSignout } from '@/utils/sign/signout';
import { HeaderMobileMenuData } from '@/types/header';
import { Button } from './ui/button';
import HeaderMobileItem from './HeaderMobileItem';

const HEADER_MOBILE_MENU_DATA: HeaderMobileMenuData[] = [
  {
    id: 1,
    icon: House,
    title: 'HOME',
    link: '/',
  },
  {
    id: 2,
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
  {
    id: 3,
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
    id: 4,
    icon: BookCopy,
    title: '학습카드',
    link: '/learning',
  },
  {
    id: 5,
    icon: NotebookText,
    title: '오답모아',
    link: '/answer',
  },
  {
    id: 6,
    icon: Award,
    title: '랭킹',
    link: '/games/rank',
  },
];

const HeaderMobileMenu = () => {
  const { data } = useAuth();
  const { handleSignout } = useSignout();

  return (
    <div className='heaber-moblie-menu'>
      {data && (
        <>
          <MyProfileInfo />
          <div className='h-[0.375rem] bg-primary-50 border-t-2 border-primary-100' />
        </>
      )}

      <div className='grow p-3'>
        <ul className='flex flex-col gap-1'>
          {HEADER_MOBILE_MENU_DATA.map((item) =>
            item.link === '/mypage' && !data ? null : (
              <HeaderMobileItem
                key={item.id}
                item={item}
              />
            ),
          )}
        </ul>
      </div>
      {data && (
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
