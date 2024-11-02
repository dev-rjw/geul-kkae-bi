'use client';
import React, { useEffect, useState } from 'react';

interface QuizTimerProps {
  onTimeOver: () => void;
  isAllQuestions: boolean;
}

const QuizTimer: React.FC<QuizTimerProps> = ({ onTimeOver, isAllQuestions }) => {
  const [isCountDown, setIsCountDown] = useState(true);
  const [countDown, setCountDown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(10000);

  useEffect(() => {
    if (isAllQuestions) return;

    let timer: NodeJS.Timeout;

    if (isCountDown) {
      // 시작 카운트 다운
      timer = setInterval(() => {
        setCountDown((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setIsCountDown(false);
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
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
    }
    return () => clearInterval(timer);
  }, [onTimeOver, isAllQuestions, isCountDown]);

  return (
    <div>
      {isCountDown ? (
        <div className='fixed inset-0 flex items-center justify-center bg-white z-50'>
          <div className='bg-[#D4F7EF] w-[290px] h-[290px] rounded-full flex items-center justify-center'>
            <p className='text-[#2AD4AF] text-[128px] font-bold'>{countDown}</p>
          </div>
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
