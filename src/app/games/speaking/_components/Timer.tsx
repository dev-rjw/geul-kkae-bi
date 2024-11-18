/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useSpeakStore } from '@/store/speakStore';
import { useTimeStore } from '@/store/timeStore';

type Upsert = {
  handleUpsertScore: () => void;
  data: User | null | undefined;
  finalPercent: number;
};

const Timer = ({ handleUpsertScore, data, finalPercent }: Upsert) => {
  const { time, isDelay, setTimer } = useTimeStore();
  const { index, setIsGame } = useSpeakStore();
  const router = useRouter();

  const handleAlert = () => {
    Swal.fire({
      html: '<div>시간이 다 됐다 깨비!<br>다음에 다시 도전하라 깨비</div>',
      confirmButtonText: '확인',
      customClass: {
        title: 'swal-custom-title',
        htmlContainer: 'swal-custom-text',
        confirmButton: 'swal-custom-button',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (data) {
          router.push(`/games/user?key=speaking&score=${finalPercent}`);
        } else {
          router.push(`/games/guest?key=speaking&score=${finalPercent}`);
        }
      }
    });
  };

  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (isDelay && time > 0 && index < 9) {
      countdown = setInterval(() => {
        if (time === 0 || index === 10) {
          clearInterval(countdown);
          handleUpsertScore();
        }
        setTimer();
      }, 1000);
      return () => clearInterval(countdown);
    }
    if (time === 0) {
      handleAlert();
      setIsGame(true);
    }
    return () => clearInterval(countdown);
  }, [isDelay, time]);

  return (
    <div className='w-[100%]'>
      <div className='w-full bg-secondary-100 h-[28px] dark:bg-gray-700 max-md:h-[14px]'>
        <div
          className='bg-secondary-300 h-[28px] rounded-r-[10px] transition-all ease-linear max-md:h-[14px] max-md:relative'
          style={{ width: `${(time / 120) * 100}%`, transitionDuration: '1s' }}
        >
          <p className='md:hidden max-md:text-4 absolute bottom-[-1.5rem] text-gray-800'>{index + 1}/10</p>
        </div>
      </div>
    </div>
  );
};

export default Timer;
