/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import speekStore from '@/store/speekStore';
import { timStore } from '@/store/timeStore';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import Tutorial from './Tutorial';

type Upsert = {
  handleUpsertScore: () => void;
};

const Timer = ({ handleUpsertScore }: Upsert) => {
  const { time, isDelay, setIsDelay, setTimer } = timStore();
  const { index } = speekStore();

  const handleAlert = () => {
    Swal.fire('시간이 다 됐다 깨비!<br>다음에 다시 도전하라 깨비');
  };

  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (isDelay && time > 0 && index < 9) {
      countdown = setInterval(() => {
        if (time === 0 || index === 9) {
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

  console.log(time);

  return (
    <div className='w-[100%]'>
      {!isDelay ? (
        <Tutorial setIsDelay={setIsDelay} />
      ) : (
        <div className='w-full bg-[#fdeace] h-[28px] dark:bg-gray-700'>
          <div
            className='bg-[#f9bc5f] h-[28px] rounded-r-[10px] transition-all ease-linear'
            style={{ width: `${(time / 120) * 100}%`, transitionDuration: '1s' }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Timer;
