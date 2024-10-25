/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';

const Timer = () => {
  const [time, setTimer] = useState(40);
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isActive && time > 0) {
      timer = setInterval(() => {
        setTimer((time) => time - 1);
      }, 1000);
    }

    if (time === 0 || !isActive) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isActive, time]);

  const handleStopTime = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <div className='w-full bg-gray-200 h-2.5 dark:bg-gray-700'>
        <div
          className='bg-blue-600 h-2.5 transition-all ease-linear'
          style={{ width: `${(time / 40) * 100}%`, transitionDuration: '1s' }}
        ></div>
      </div>
      <button onClick={handleStopTime}>정지</button>
    </div>
  );
};

export default Timer;
