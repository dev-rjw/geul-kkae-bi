import Link from 'next/link';
import { HeaderPcMenuProps } from '@/types/header';

const HeaderPcMenu = ({ item, hoveredMenu, onHover, onLeave }: HeaderPcMenuProps) => {
  return (
    <li
      className={`heaber-pc-menu-item ${hoveredMenu === item.id && item.children ? 'menu-on' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {item.link ? (
        <Link
          className='heaber-pc-menu-title'
          href={item.link}
        >
          {item.title}
        </Link>
      ) : (
        <span className='heaber-pc-menu-title'>{item.title}</span>
      )}

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

export default HeaderPcMenu;
