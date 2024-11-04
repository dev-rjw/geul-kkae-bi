'use client';
import React, { useEffect, useState } from 'react';

interface QuizTimerProps {
  onTimeOver: () => void;
  isAllQuestions: boolean;
}

const QuizTimer: React.FC<QuizTimerProps> = ({ onTimeOver, isAllQuestions }) => {
  const [timeLeft, setTimeLeft] = useState(40);
  const [isTutorial, setIsTutorial] = useState(true);

  useEffect(() => {
    if (isAllQuestions || isTutorial) return;

    let timer: NodeJS.Timeout;

    // 퀴즈 타이머 시작
    timer = setInterval(() => {
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
    setIsTutorial(false);
  };

  return (
    <div>
      {isTutorial ? (
        <div className='fixed inset-0 flex items-center justify-center bg-white z-50'>
          <img
            src='/tutorial_checking.svg'
            alt='튜토리얼'
            className='w-full h-full object-cover'
          />
          <button
            className='absolute bottom-[32px] right-[62px] bg-[#A07BE5] px-[62px] py-[18px] rounded-full font-bold text-[38px] leading-[57px]'
            onClick={handleStartGame}
          >
            시작하기
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className='w-full bg-checking-100 h-[28px]'>
        <div
          className=' bg-checking-300 h-[28px] transition-all ease-linear rounded-r-lg'
          style={{ width: `${(timeLeft / 40) * 100}%`, transitionDuration: '1s' }}
        ></div>
      </div>
    </div>
  );
};

export default QuizTimer;
