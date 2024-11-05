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
    setIsTutorial(false);
  };

  return (
    <div>
      {isTutorial ? (
        <div className="absolute w-full z-10 h-[100vh] bg-[url('/checking_tutorial.svg')] bg-cover">
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
