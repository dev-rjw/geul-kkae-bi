import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { HeaderMobileMenuProps } from '@/types/header';
import { useAuth } from '@/queries/useAuth';

const HeaderMobileMenuItem = ({ item }: HeaderMobileMenuProps) => {
  const router = useRouter();
  const { data: user } = useAuth();
  const restrictedLink = ['/games/rank', '/answer'];

  const handleMenuClick = (link: string | undefined) => {
    if (restrictedLink.includes(link || '') && !user) {
      Swal.fire({
        html: `<div class="text-gray-600">글깨비의 다양한 기능은 <br/>로그인을 하시면 이용하실 수 있어요!</div>`,
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text',
          confirmButton: 'swal-custom-button',
          cancelButton: 'swal-custom-button',
        },
        reverseButtons: true,
        showCancelButton: true,
        cancelButtonText: '취소',
        confirmButtonText: '로그인하러가기',
      }).then(async (result) => {
        if (result.isConfirmed) {
          router.push('/signin');
        }
      });
    } else {
      // 로그인된 사용자라면 링크로 이동
      window.location.href = link || '#';
    }
  };

  return (
    <li className='heaber-mobile-menu-item'>
      <span
        className='heaber-mobile-menu-title'
        onClick={() => handleMenuClick(item.link)}
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
