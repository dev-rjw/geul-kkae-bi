'use client';
import { QuizTimerProps } from '@/types/checking';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const QuizTimer: React.FC<QuizTimerProps> = ({ onTimeOver, isAllQuestions }) => {
  const [timeLeft, setTimeLeft] = useState(40);
  const [isTutorial, setIsTutorial] = useState(true);

  const onTimeOverRef = useRef(onTimeOver);

  useEffect(() => {
    // onTimeOver가 변경될 때마다 ref 업데이트
    onTimeOverRef.current = onTimeOver;
  }, [onTimeOver]);

  useEffect(() => {
    if (isAllQuestions || isTutorial) return;

    // 퀴즈 타이머 시작
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
        <div className='fixed inset-0 z-50 bg-[#858584]'>
          <Image
            src='/checking_tutorial.svg'
            alt='Tutorial'
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
          <button
            className='absolute bottom-[2rem] right-[3.875rem] bg-[#92B9F2] px-[3.875rem] py-[1.125rem] rounded-full font-bold text-[2.375rem] leading-[3.563rem]'
            onClick={handleStartGame}
          >
            시작하기
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
