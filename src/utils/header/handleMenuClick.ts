import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

type HandleMenuClickProps = {
  link: string;
  user: User | null | undefined;
  ranks: string[] | null | undefined;
};

export const useHandleMenuClick = () => {
  const router = useRouter();
  const restrictedLink = ['/games/rank', '/games/wronganswer'];

  const handleMenuClick = ({ link, user, ranks }: HandleMenuClickProps): void => {
    const isLogined = user !== null;
    const isRestrictedLink = restrictedLink.includes(link);
    const isRankPath = link === '/games/rank';
    const hasRanking = ranks?.[0] !== undefined;

    if (!isLogined && isRestrictedLink) {
      Swal.fire({
        html: `<div>
          <div class='swal-img-wrap'><img class='swal-img character-sad-kkaebi' src='/character_sad_kkaebi.svg' /></div>
          <div class='swal-title'>죄송해요!</div>
          <div class="swal-text">글깨비의 다양한 기능은 <br/>로그인을 하시면 이용하실 수 있어요!</div>
        </div>`,
        customClass: {
          popup: 'swal-custom-popup-large',
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

      return;
    }
    if (isLogined && isRankPath && !hasRanking) {
      Swal.fire({
        html: `<div class="text-gray-600">이번 주 랭킹이 없습니다.<br />첫 랭킹의 주인공이 되어보세요.</div>`,
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text',
          confirmButton: 'swal-custom-button ',
        },
        confirmButtonText: '확인',
      });

      return;
    }

    router.push(link);
  };

  return handleMenuClick;
};
