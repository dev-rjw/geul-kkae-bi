'use client';

import Link from 'next/link';
import { HeaderMobileMenuProps } from '@/types/header';
import { useAuth } from '@/queries/useAuth';
import { useRank } from '@/queries/useRank';
import { weekCalculate } from '@/utils/rank/client-action';
import { useHandleMenuClick } from '@/utils/header/handleMenuClick';

const HeaderMobileMenuItem = ({ item }: HeaderMobileMenuProps) => {
  const { data: user } = useAuth();
  const { data: ranks } = useRank(weekCalculate(0));
  const handleMenuClick = useHandleMenuClick();
  const link = item.link ?? '';

  return (
    <li className='heaber-mobile-menu-item'>
      <span
        className={`heaber-mobile-menu-title ${!link && 'pointer-events-none cursor-default'}`}
        onClick={() => handleMenuClick({ link, user, ranks })}
      >
        <div className='heaber-mobile-menu-icon'>{item.icon && <item.icon />}</div>
        {item.title}
      </span>

      <div className='heaber-mobile-menu-content'>
        <ul className='heaber-mobile-menu-children'>
          {item.children &&
            item.children.map((child) => (
              <li key={child.title}>
                <Link
                  className='heaber-mobile-menu-children-title'
                  href={child.link || '#'}
                >
                  <span className='heaber-mobile-menu-children-dot' />
                  {child.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </li>
  );
};

export default HeaderMobileMenuItem;
