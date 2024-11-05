'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface QuizTimerProps {
  onTimeOver: () => void;
  isAllQuestions: boolean;
}

const QuizTimer: React.FC<QuizTimerProps> = ({ onTimeOver, isAllQuestions }) => {
  const [timeLeft, setTimeLeft] = useState(40);
  const [isTutorial, setIstutorial] = useState(true);

  useEffect(() => {
    if (isAllQuestions || isTutorial) return;

    // 퀴즈 타이머 시작
    const timer: NodeJS.Timeout = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          onTimeOver();
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onTimeOver, isAllQuestions, isTutorial]);

  const handleStartGame = () => {
    setIstutorial(false);
  };

  return (
    <div>
      {isTutorial ? (
        <div className='fixed inset-0 flex items-col items-center justify-center bg-white z-50'>
          <Image
            src='/writing_tutorial.svg'
            alt='tutorial'
            layout='fill'
            objectFit='cover'
          />
          <button
            onClick={handleStartGame}
            className='absolute bottom-[32px] right-[62px] bg-[#92B9F2] px-[62px] py-[18px] rounded-full font-bold text-[38px] leading-[57px] '
          >
            시작하기
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className='w-full bg-[#BAF1E5] h-[28px]'>
        <div
          className=' bg-[#2AD4AF] h-[28px] transition-all ease-linear rounded-r-lg'
          style={{ width: `${(timeLeft / 40) * 100}%`, transitionDuration: '1s' }}
        ></div>
      </div>
    </div>
  );
};

export default QuizTimer;
