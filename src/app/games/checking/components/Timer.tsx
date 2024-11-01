'use client';
import React, { useEffect, useState } from 'react';

interface TimerProps {
  onTimeOver: () => void;
  isAllQuestions: boolean;
}

const Timer: React.FC<TimerProps> = ({ onTimeOver, isAllQuestions }) => {
  const [timeLeft, setTimeLeft] = useState(40);

  useEffect(() => {
    if (isAllQuestions) return;

    let timer: NodeJS.Timeout;

    const startTimer = () => {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            onTimeOver();
            return 0; // 음수 나오지 마라!
          }
          return prevTime - 1;
        });
      }, 1000);
    };
    startTimer();
    return () => {
      clearInterval(timer);
    };
  }, [onTimeOver, isAllQuestions]);

  return (
    <div>
      <div className='w-full bg-checking-100 h-[28px]'>
        <div
          className=' bg-checking-300 h-[28px] transition-all ease-linear rounded-r-lg'
          style={{ width: `${(timeLeft / 40) * 100}%`, transitionDuration: '1s' }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;
