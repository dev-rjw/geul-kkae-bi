/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import speekStore from '@/store/speekStore';
import { timeStore } from '@/store/timeStore';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import Tutorial from './Tutorial';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

type Upsert = {
  handleUpsertScore: () => void;
  data: User | null | undefined;
  finalPercent: number;
};

const Timer = ({ handleUpsertScore, data, finalPercent }: Upsert) => {
  const { time, isDelay, setIsDelay, setTimer } = timeStore();
  const { index } = speekStore();
  const router = useRouter();

  const handleAlert = () => {
    Swal.fire({
      html: '<p>시간이 다 됐다 깨비!<br>다음에 다시 도전하라 깨비</p>',
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
    }
    return () => clearInterval(countdown);
  }, [isDelay, time]);

  return (
    <div className='w-[100%]'>
      <div className='w-full bg-[#fdeace] h-[28px] dark:bg-gray-700'>
        <div
          className='bg-[#f9bc5f] h-[28px] rounded-r-[10px] transition-all ease-linear'
          style={{ width: `${(time / 120) * 100}%`, transitionDuration: '1s' }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;
