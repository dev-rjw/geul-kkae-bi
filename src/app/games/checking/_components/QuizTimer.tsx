'use client';
import { QuizTimerProps } from '@/types/checking';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import MobileTutorial from './MobileTutorial';

const QuizTimer: React.FC<QuizTimerProps> = ({ onTimeOver, isAllQuestions, isMobile }) => {
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
        isMobile ? (
          <MobileTutorial onStartGame={handleStartGame} />
        ) : (
          <div className='fixed inset-0 z-10 bg-[#252424]'>
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
              <span className='relative z-10 title-20 text-tertiary-p-700'>GAME START</span>
            </button>
          </div>
        )
      ) : null}
      <div className={`w-full bg-tertiary-p-100 ${isMobile ? 'h-[14px]' : 'h-7'}`}>
        <div
          className={`bg-tertiary-p-300 ${isMobile ? 'h-[14px]' : 'h-7'} transition-all ease-linear rounded-r-lg`}
          style={{ width: `${(timeLeft / 40) * 100}%`, transitionDuration: '1s' }}
        ></div>
      </div>
    </div>
  );
};

export default QuizTimer;
