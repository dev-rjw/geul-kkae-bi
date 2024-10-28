/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import speekStore from '@/store/speekStore';
import { timStore } from '@/store/timeStore';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

type Upsert = {
  handleUpsertScore: () => void;
};

const Timer = ({ handleUpsertScore }: Upsert) => {
  const { time, setTimer } = timStore();
  const { index } = speekStore();

  console.log(time);
  const handleAlert = () => {
    Swal.fire('시간 종료 설마 다 못풀었나요~?');
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (time > 0) {
      timer = setInterval(() => {
        setTimer();
      }, 1000);
    }
    if (index > 9) {
      clearInterval(timer);
      handleUpsertScore();
    } else if (time === 0) {
      clearInterval(timer);
      handleUpsertScore();
      handleAlert();
    }

    return () => clearInterval(timer);
  }, [index, time]);

  return (
    <div className='w-[100%]'>
      <div className='w-full bg-[#fdeace] h-2.5 dark:bg-gray-700'>
        <div
          className='bg-[#f9bc5f] h-2.5 transition-all ease-linear'
          style={{ width: `${(time / 40) * 100}%`, transitionDuration: '1s' }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;
