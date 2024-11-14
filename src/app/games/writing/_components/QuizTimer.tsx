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
        <div className='fixed inset-0 z-50 bg-[#2f2f2f] flex justify-center items-center'>
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
            <span className='relative z-10 title-20 text-[#115546] text-shadow'>GAME START</span>
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
