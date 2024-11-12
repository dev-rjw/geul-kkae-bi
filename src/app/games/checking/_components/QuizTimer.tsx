'use client';
import { QuizTimerProps } from '@/types/checking';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const QuizTimer: React.FC<QuizTimerProps> = ({ onTimeOver, isAllQuestions }) => {
  const [timeLeft, setTimeLeft] = useState(40);
  const [isTutorial, setIsTutorial] = useState(true);

  const onTimeOverRef = useRef(onTimeOver);

  useEffect(() => {
    onTimeOverRef.current = onTimeOver;
  }, [onTimeOver]);

  useEffect(() => {
    if (isAllQuestions || isTutorial) return;

    const timer: NodeJS.Timeout = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          setTimeout(() => onTimeOverRef.current(), 0);
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isAllQuestions, isTutorial]);

  const handleStartGame = () => {
    setIsTutorial(false);
  };

  return (
    <div>
      {isTutorial ? (
        <div className='fixed inset-0 z-10 bg-[#858584]'>
          <Image
            src='/checking_tutorial.svg'
            alt='Tutorial'
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
          <button
            className='start_checking_btn absolute bottom-[4.375rem] right-[62px] w-[13.063rem] py-[15px] rounded-[80px]'
            onClick={handleStartGame}
          >
            <span className='relative z-10 title-20 text-secondary-800'>GAME START</span>
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className='w-full bg-checking-100 h-7'>
        <div
          className=' bg-checking-300 h-7 transition-all ease-linear rounded-r-lg'
          style={{ width: `${(timeLeft / 40) * 100}%`, transitionDuration: '1s' }}
        ></div>
      </div>
    </div>
  );
};

export default QuizTimer;
