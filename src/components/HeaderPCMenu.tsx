'use client';

import { useState } from 'react';
import { HeaderPcMenuData } from '@/types/header';
import HeaderPcMenu from './HeaderPCMenuItem';

const HEADER_PC_MENU_DATA: HeaderPcMenuData[] = [
  {
    id: 1,
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
    id: 2,
    title: '학습카드',
    link: '/learning',
  },
  {
    id: 3,
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
    id: 4,
    title: '랭킹',
    link: '/games/rank',
  },
];

const HeaderPCMenu = () => {
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);

  return (
    <ul className='heaber-pc-menu'>
      {HEADER_PC_MENU_DATA.map((item) => (
        <HeaderPcMenu
          key={item.id}
          item={item}
          hoveredMenu={hoveredMenu}
          onHover={() => setHoveredMenu(item.id)}
          onLeave={() => setHoveredMenu(null)}
        />
      ))}
    </ul>
  );
};

export default HeaderPCMenu;
