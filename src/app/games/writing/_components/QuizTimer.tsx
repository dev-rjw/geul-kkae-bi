'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface QuizTimerProps {
  onTimeOver: () => void;
  isAllQuestions: boolean;
}

const QuizTimer: React.FC<QuizTimerProps> = ({ onTimeOver, isAllQuestions }) => {
  const [timeLeft, setTimeLeft] = useState(40);
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
        <div className='fixed inset-0 z-50 bg-[#858584]'>
          <Image
            src='/writing_tutorial.svg'
            alt='Tutorial'
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
          <button
            onClick={handleStartGame}
            className='absolute bottom-[32px] right-[62px] bg-[#92B9F2] px-[62px] py-[18px] rounded-full font-bold text-[38px] leading-[57px]'
          >
            시작하기
          </button>
        </div>
      ) : null}
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
