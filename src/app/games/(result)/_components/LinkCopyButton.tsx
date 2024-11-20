'use client';

import Image from 'next/image';
import Swal from 'sweetalert2';
import { Button } from '../../../../components/ui/button';

const LinkCopyButton = ({ url }: { url: string }) => {
  const hanbleLinkCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      Swal.fire({
        html: `<div class="text-primary-400">링크가 복사되었습니다.<br/>친구와 공유해보세요!</div>`,
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text',
          confirmButton: 'swal-custom-button',
        },
        confirmButtonText: '확인',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error('링크 복사 실패:', error);

      Swal.fire({
        html: `<div class="text-primary-400">링크 복사에 실패했습니다.<br/>다시 시도해주세요.</div>`,
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text',
          confirmButton: 'swal-custom-button',
        },
        confirmButtonText: '확인',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <Button
      className='flex items-center justify-start gap-2 h-11 text-lg font-bold text-gray-600 px-4 py-2 rounded-none bg-transparent hover:bg-primary-50'
      onClick={hanbleLinkCopy}
    >
      <div className='relative aspect-square w-7 rounded-full'>
        <Image
          src={`/icon_link@2x.png`}
          alt='링크 아이콘'
          fill
          className='object-fill'
        />
      </div>
      링크 복사하기
    </Button>
  );
};

export default LinkCopyButton;
