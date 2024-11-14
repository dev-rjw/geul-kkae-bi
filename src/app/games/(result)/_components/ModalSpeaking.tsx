'use client';
import { SpeekResult } from '@/types/speeking';
import { useEffect, useState } from 'react';

const ModalSpeaking = () => {
  const [result, setResult] = useState<SpeekResult[]>();

  useEffect(() => {
    const speakingScore = localStorage.getItem('speakingResult');
    const data = speakingScore ? JSON.parse(speakingScore) : null;
    setResult(data);
  }, []);

  return (
    <div className='bg-white w-[1002px] h-[792px] overflow-hidden rounded-[3.125rem] border-solid border-[0.625rem] border-secondary-600'>
      <div className='bg-secondary-200  h-full'>
        <div className='flex flex-col items-center'>
          <h2 className='mt-[1.375rem] title-40 text-secondary-700'>오답공개</h2>
          <p className='mt-[1.813rem] body-24'>발음 문제는 30% 이하 점수만 오답으로 책정됩니다.</p>
          {result?.map((item, index) => {
            return (
              <div
                className='flex items-center justify-between bg-secondary-100 w-[802px] h-[136px] mb-6 px-[1.125rem]'
                key={item.text}
              >
                <div>
                  <strong className='title-32'>{index + 1}</strong>
                  <p className='text-[1.75rem] font-semibold'>{item.text}</p>
                </div>
                <span className='font-bold text-[3.5rem]'>{item.score}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModalSpeaking;
