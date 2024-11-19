import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { HeaderPcMenuProps } from '@/types/header';
import { useAuth } from '@/queries/useAuth';
import { useGetLatestWeek, useGetLatestWeekData } from '@/queries/useGetRank';

const HeaderPcMenu = ({ item, hoveredMenu, onHover, onLeave }: HeaderPcMenuProps) => {
  const router = useRouter();
  const { data: user } = useAuth();
  const restrictedLink = ['/games/rank', '/answer'];
  const { data: latestWeekData } = useGetLatestWeekData();
  const latestWeek = latestWeekData?.week;
  const { data: latestWeekForAlert } = useGetLatestWeek(latestWeek!);

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
      console.log('latestWeekForAlert', latestWeekForAlert);
      if (!latestWeekForAlert || latestWeekForAlert.length === 0) {
        Swal.fire({
          html: `<div class="text-gray-600">아직 랭킹이 없어요. <br/>랭킹을 확인하시려면 게임을 <br/>모두 완료해주세요!</div>`,
          customClass: {
            title: 'swal-custom-title',
            htmlContainer: 'swal-custom-text',
            confirmButton: 'swal-custom-button ',
          },
          confirmButtonText: '확인',
        });
        router.push('/');
      } else {
        // 로그인된 사용자라면 링크로 이동
        window.location.href = link || '#';
      }
    }
  };

  return (
    <li
      className={`heaber-pc-menu-item ${hoveredMenu === item.id && item.children ? 'menu-on' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <span
        className='heaber-pc-menu-title'
        onClick={() => handleMenuClick(item.link)}
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

export default HeaderPcMenu;
