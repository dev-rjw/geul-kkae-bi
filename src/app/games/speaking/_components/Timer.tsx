/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import speekStore from '@/store/speekStoreStore';
import { useEffect, useState } from 'react';

const Timer = () => {
  const [time, setTimer] = useState(40);
  const { index } = speekStore();

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (time > 0) {
      timer = setInterval(() => {
        setTimer((time) => time - 1);
      }, 1000);
    }
    if (time === 0 || index > 9) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [index, time]);

  return (
    <div>
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
