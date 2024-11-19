'use client';

import Image from 'next/image';
import Swal from 'sweetalert2';
import { Button } from '../../../../components/ui/button';

const LinkCopyButton = ({ url }: { url: string }) => {
  const hanbleLinkCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      Swal.fire({
        icon: 'success',
        title: '링크 복사 완료',
        text: '링크가 복사되었습니다. 친구와 공유해보세요!',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('링크 복사 실패:', error);
      Swal.fire({
        icon: 'error',
        title: '복사 실패',
        text: '링크 복사에 실패했습니다. 다시 시도해주세요.',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <Button
      className='flex items-center justify-start gap-2 h-11 text-lg font-bold text-gray-600 px-4 py-2 bg-transparent hover:bg-primary-50'
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
