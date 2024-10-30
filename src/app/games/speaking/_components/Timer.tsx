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

  const handleAlert = () => {
    Swal.fire('시간이 다 됐다 깨비!<br>다음에 다시 도전하라 깨비');
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    let delayTimer: NodeJS.Timeout | undefined;
    // timer = setInterval(() => {
    //   setTimer();
    // }, 1000);

    if (time > 0) {
      delayTimer = setTimeout(() => {
        timer = setInterval(() => {
          setTimer();
        }, 1000);
      }, 3000); // 3초 지연
    }
    if (index === 9) {
      clearInterval(timer);
      handleUpsertScore();
    }
    return () => clearInterval(timer);
  }, [index]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (time === 0) {
      clearInterval(timer);
      handleUpsertScore();
      handleAlert();
    }
    return () => clearInterval(timer);
  }, [time]);

  return (
    <div className='w-[100%]'>
      <div className='w-full bg-[#fdeace] h-[28px] dark:bg-gray-700'>
        <div
          className='bg-[#f9bc5f] h-[28px] rounded-r-[10px] transition-all ease-linear'
          style={{ width: `${(time / 40) * 100}%`, transitionDuration: '1s' }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;
