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
  const { time, startTime, isDelay, setIsDelay, setStartTimer, setTimer } = timStore();
  const { index } = speekStore();

  const handleAlert = () => {
    Swal.fire('시간이 다 됐다 깨비!<br>다음에 다시 도전하라 깨비');
  };
  const [isDelayed, setIsDelayed] = useState(true); // 딜레이 상태

  useEffect(() => {
    // 3초 후에 타이머 시작
    if (startTime > 0) {
      const delayTimer = setInterval(() => {
        setStartTimer();
      }, 1000);
      return () => clearTimeout(delayTimer);
    } else {
      setIsDelayed(false);
    }
  }, [startTime]);

  useEffect(() => {
    if (!isDelayed && time > 0 && index < 9) {
      const countdown = setInterval(() => {
        setTimer();
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      handleUpsertScore();
    }
    if (time === 0) {
      handleAlert();
    }
  }, [isDelayed, time]);

  return (
    <div className='w-[100%]'>
      {isDelayed ? (
        <div className='absolute w-full z-10 top-[28px] h-[100vh] bg-[#FCFBF9] flex items-center justify-center'>
          <div className='bg-[#fdeace] w-[290px] h-[276px] rounded-full flex items-center justify-center'>
            <p className='text-[#f9bc5f] text-[128px]'>{startTime}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
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
