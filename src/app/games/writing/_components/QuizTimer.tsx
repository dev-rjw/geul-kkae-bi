'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import MobileTutorial from './MobileTutorial';
import { QuizTimerProps } from '@/types/writing';

const QuizTimer: React.FC<QuizTimerProps> = ({ onTimeOver, isAllQuestions, isMobile, currentQuizIndex }) => {
  const [timeLeft, setTimeLeft] = useState(100);
  const [isTutorial, setIsTutorial] = useState(true);
  const workerRef = useRef<Worker | null>(null);
  const onTimeOverRef = useRef(onTimeOver);

  useEffect(() => {
    onTimeOverRef.current = onTimeOver;
  }, [onTimeOver]);

  useEffect(() => {
    if (!workerRef.current) {
      workerRef.current = new Worker(new URL('../util/TimerWorker.js', import.meta.url));

      workerRef.current.onmessage = (e) => {
        if (e.data === 'timeover') {
          setTimeout(() => {
            onTimeOverRef.current();
          }, 1000);
        } else if (typeof e.data === 'number') {
          setTimeLeft(e.data);
        }
      };
    }

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isAllQuestions || isTutorial) return;

    workerRef.current?.postMessage('start');

    return () => {
      workerRef.current?.postMessage('stop');
    };
  }, [isAllQuestions, isTutorial]);

  const handleStartGame = () => {
    setIsTutorial(false);
    workerRef.current?.postMessage('start');
  };

  return (
    <div>
      {isTutorial ? (
        isMobile ? (
          <MobileTutorial onStartGame={handleStartGame} />
        ) : (
          <div className='fixed inset-0 z-50 bg-[#2f2f2f] flex flex-col justify-center items-center'>
            <Image
              src='/writing_tutorial.svg'
              alt='Tutorial'
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
            <button
              onClick={handleStartGame}
              className='start_writing_btn absolute bottom-[4.375rem] right-[62px] w-[209px] py-[15px] rounded-[80px]'
            >
              <span className='relative z-10 title-20 text-tertiary-g-800 text-shadow'>GAME START</span>
            </button>
          </div>
        )
      ) : null}
      <div className={`w-full bg-[#BAF1E5] ${isMobile ? 'h-[14px]' : 'h-[28px]'}`}>
        <div
          className={`bg-tertiary-g-500 ${isMobile ? 'h-[14px]' : 'h-[28px]'} transition-all ease-linear rounded-r-lg`}
          style={{ width: `${(timeLeft / 100) * 100}%`, transitionDuration: '1s' }}
        ></div>
        {isMobile && <p className='self-center text-base font-medium mb-2'>{`${currentQuizIndex + 1}/10`}</p>}
      </div>
    </div>
  );
};

export default QuizTimer;
