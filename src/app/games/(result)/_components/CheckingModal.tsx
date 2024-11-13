'use client';
import React, { useEffect, useState } from 'react';
import { CheckingResult } from '@/types/checking';

const CheckingModal = () => {
  const [result, setResult] = useState<CheckingResult[]>([]);
  const [openResult, setOpenResult] = useState<number | null>(null);

  useEffect(() => {
    const checkingResult = localStorage.getItem('checkingQuizResults');
    if (checkingResult) setResult(JSON.parse(checkingResult));
  }, []);

  return (
    <div className='flex justify-center items-start'>
      <ul className='mt-[100px] w-[836px] max-h-[559px] overflow-auto'>
        {result.map((result, index) => (
          <li
            key={result.test}
            className='mb-2'
          >
            <div className='flex justify-between items-center h-[87px] px-8 rounded-[8px] mb-2 bg-[#EFE9FB]'>
              <div className='flex justify-start items-center'>
                <p className='text-[32px] font-medium text-[#4F21A6]'>{String(index + 1).padStart(2, '0')}번</p>
                <p className='text-3xl font-bold'>{result.test.slice(0, 6)}</p>
                {result.isCorrect ? (
                  <img
                    src='/icon_correctanswer_modal.svg'
                    alt='correctanswer'
                    className='ml-[14px]'
                  />
                ) : (
                  <img
                    src='/icon_wronganswer_modal.svg'
                    alt='wronganswer'
                    className='ml-[14px]'
                  />
                )}
              </div>
              <button
                onClick={() => setOpenResult(openResult === index ? null : index)}
                className='flex items-center font-medium py-1 px-6 text-2xl text-[#FCFBFE] bg-[#A07BE5] rounded-[8px]'
              >
                정답 확인
                <img
                  src='/icon_btn_modal.svg'
                  alt='btn'
                  className=' ml-[10px]'
                />
              </button>
            </div>
            {openResult === index && (
              <div className=' p-4 rounded-lg bg-[#DDD0F6] '>
                <p className=' text-[24px] font-semibold mb-2 py-[24px] px-[16px] '>문제</p>
                <p className=' mb-4'>{result.test}</p>
                <div className='flex flex-wrap mb-4'>
                  {result.option.map((item, optIndex) => (
                    <div
                      key={item}
                      className='w-1/2 flex items-center mb-3'
                    >
                      <span className='w-6 h-6 flex items-center justify-center  rounded-full mr-2'>
                        {optIndex + 1}
                      </span>
                      <p className=''>{item}</p>
                    </div>
                  ))}
                </div>
                <div className='flex items-center p-3  rounded-lg'>
                  <span className=' px-3 py-1 rounded-lg font-semibold mr-2'>정답</span>
                  <p className='flex items-center font-semibold gap-3'>
                    {result.answer}
                    <img
                      src='/icon_arrow_modal.svg'
                      alt='arrow'
                    />
                    {result.right}
                  </p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckingModal;
