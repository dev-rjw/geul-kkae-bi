'use client';
import React, { useEffect, useState } from 'react';

interface TimerProps {
  onTimeOver: () => void;
}

const Timer: React.FC<TimerProps> = ({ onTimeOver }) => {
  const [timeLeft, setTimeLeft] = useState(40);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const startTimer = () => {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            onTimeOver();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // 1초마다 타이머 업데이트
    };
    startTimer();
    return () => {
      clearInterval(timer);
    };
  }, [onTimeOver]);

  return (
    <div>
      <div className='w-full bg-gray-200 h-2.5 dark:bg-gray-700'>
        <div
          className='bg-blue-600 h-2.5 transition-all ease-linear'
          style={{ width: `${(timeLeft / 40) * 100}%`, transitionDuration: '1s' }}
        >
          {timeLeft}
        </div>
      </div>
    </div>
  );
};

export default Timer;
