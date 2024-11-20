'use client';
import { SpeekResult } from '@/types/speeking';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  handleCloseModal: () => void;
};

const ModalSpeaking = ({ handleCloseModal }: Props) => {
  const [result, setResult] = useState<SpeekResult[]>();

  useEffect(() => {
    const speakingScore = localStorage.getItem('speakingResult');
    const data = speakingScore ? JSON.parse(speakingScore) : null;
    setResult(data);
  }, []);

  return (
    <div className='w-[1002px] relative h-[792px] overflow-hidden rounded-[3.125rem] max-md:w-[358px] max-md:h-[90vh] max-md:rounded-[1.25rem]'>
      <div className='bg-secondary-200 h-full max-md:px-5'>
        <div className='flex flex-col items-center max-md:h-full'>
          <h2 className='mt-[3rem] title-40 text-secondary-700 max-md:title-24 max-md:mt-[2.125rem]'>
            <span className='text-secondary-600'>나야, 발음왕</span> 오답공개
          </h2>
          <p className='mt-3 body-24 max-md:caption-14 max-md:mt-0'>
            발음 문제는 <span className='text-secondary-600'>30% 이하</span> 점수만 오답으로 책정됩니다.
          </p>
          <div className='mt-[2.5rem] h-[31.75rem] overflow-y-scroll scrollbar-secondary pr-4 mr-[-2rem] max-md:mt-[1.188rem] max-md:h-full max-md:pr-1 max-md:mr-[-0.5rem] max-md:mb-[2.125rem]'>
            {result?.map((item, index) => {
              return (
                <div
                  className='relative flex items-center bg-secondary-100 w-[802px] h-[5.375rem] mb-4 px-[1.125rem] max-md:min-w-[19.875rem] max-md:w-auto max-md:flex-col max-md:h-[auto] max-md:p-2 max-md:items-start max-md:rounded-lg'
                  key={item.text}
                >
                  <strong className='title-32 w-[8.438rem] text-secondary-700 text-center max-md:title-20 max-md:w-auto'>
                    0{index + 1}
                  </strong>
                  <p className='body-24 font-semibold max-md:body-16'>{item.text}</p>
                  <p className='font-bold text-secondary-500 text-[3.5rem] ml-auto max-md:absolute max-md:right-3 max-md:top-3.5 max-md:body-20'>
                    {item.score}
                    <span className='text-[24px] max-md:body-16'>%</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button
        className='absolute right-[2.5rem] top-[2.25rem] max-md:right-4 max-md:top-4'
        onClick={handleCloseModal}
      >
        <Image
          src='/ico_speak_close.svg'
          width={48}
          height={48}
          alt='모달 닫기'
          className='max-md:w-6 max-md:h-6'
        ></Image>
      </button>
    </div>
  );
};

export default ModalSpeaking;
