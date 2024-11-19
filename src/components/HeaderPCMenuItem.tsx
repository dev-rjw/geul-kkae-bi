'use client';

import Link from 'next/link';
import { HeaderPcMenuProps } from '@/types/header';
import { useAuth } from '@/queries/useAuth';
import { useRank } from '@/queries/useRank';
import { weekCalculate } from '@/utils/rank/client-action';
import { useHandleMenuClick } from '@/utils/header/handleMenuClick';

const HeaderPCMenuItem = ({ item, hoveredMenu, onHover, onLeave }: HeaderPcMenuProps) => {
  const { data: user } = useAuth();
  const { data: ranks } = useRank(weekCalculate(0));
  const handleMenuClick = useHandleMenuClick();
  const link = item.link ?? '';

  return (
    <li
      className={`heaber-pc-menu-item ${hoveredMenu === item.id && item.children ? 'menu-on' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <span
        className='heaber-pc-menu-title'
        onClick={() => handleMenuClick({ link, user, ranks })}
      >
        {item.title}
      </span>

      <div className='heaber-pc-menu-content'>
        <ul className='heaber-pc-menu-children'>
          {item.children &&
            item.children.map((child) => (
              <li key={child.title}>
                <Link
                  className='heaber-pc-menu-children-title'
                  href={child.link || '#'}
                >
                  {child.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </li>
  );
};

export default HeaderPCMenuItem;
