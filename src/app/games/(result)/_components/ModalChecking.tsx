'use client';
import React, { useEffect, useState } from 'react';
import { CheckingResult } from '@/types/checking';

const ModalChecking = () => {
  const [result, setResult] = useState<CheckingResult[]>([]);
  const [openResult, setOpenResult] = useState<number | null>(null);

  useEffect(() => {
    const checkingResult = localStorage.getItem('checkingQuizResults');
    if (checkingResult) setResult(JSON.parse(checkingResult));
  }, []);

  return (
    <div className='bg-[#BFA5ED] w-[63rem] h-[48rem] rounded-[3.125rem] flex flex-col items-center'>
      <h2 className='mt-12 text-[2.5rem] font-bold text-[#4f21a6]'>오답 공개</h2>
      <div className='flex justify-center items-start'>
        <ul className='mt-12 w-[50.5rem] max-h-[34.938rem] overflow-auto'>
          {result.map((result, index) => (
            <li
              key={result.test}
              className={`mb-2 ${openResult === index ? 'mb-6' : ''}`}
            >
              <div className='flex justify-between items-center h-[5.438rem] px-8 rounded-[0.5rem] bg-[#EFE9FB]'>
                <div className='flex items-center'>
                  <p className='text-[2rem] font-medium text-[#4F21A6] mr-[1.188rem]'>
                    {String(index + 1).padStart(2, '0')}번
                  </p>
                  <span className='h-[2.5rem] border-l-2 border-[#bfa5ed] mr-[1.438rem]'></span>
                  <p className='text-3xl font-bold text-[#504F4E]'>{result.test.slice(0, 6)}</p>
                  {result.isCorrect ? (
                    <img
                      src='/icon_correctanswer_modal.svg'
                      alt='correctanswer'
                      className='ml-[0.875rem]'
                    />
                  ) : (
                    <img
                      src='/icon_wronganswer_modal.svg'
                      alt='wronganswer'
                      className='ml-[0.875rem]'
                    />
                  )}
                </div>
                <button
                  onClick={() => setOpenResult(openResult === index ? null : index)}
                  className='flex items-center py-1 px-6 text-2xl font-medium text-[#FCFBFE] bg-[#A07BE5] rounded-[0.5rem]'
                >
                  정답 확인
                  <img
                    src='/icon_btn_modal.svg'
                    alt='btn'
                    className='ml-[0.625rem]'
                  />
                </button>
              </div>
              {openResult === index && (
                <div className='mt-2 rounded-lg h-[19.938rem]'>
                  <div className='bg-[#ddd0f6] p-8 mb-[0.188rem] rounded-t-[0.5rem]'>
                    <div className='flex items-center gap-5 mb-5'>
                      <span className='text-[1.5rem] text-[#6429D1] font-semibold py-[0.125rem] px-4 bg-[#BFA5ED] rounded-[0.5rem] whitespace-nowrap'>
                        문제
                      </span>
                      <p className='text-3xl font-bold text-[#504F4E]'>{result.test}</p>
                    </div>
                    <div className='grid grid-cols-2 gap-x-8 gap-y-4 ml-[94px]'>
                      {result.option.map((item, optIndex) => (
                        <div
                          key={item}
                          className='flex items-center gap-2'
                        >
                          <span className='w-7 h-7 flex items-center justify-center rounded-full bg-[#A07BE5] text-xl text-white font-bold'>
                            {optIndex + 1}
                          </span>
                          <p className='text-2xl font-semibold text-[#504F4E]'>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className=' flex items-center p-8 rounded-b-[0.5rem] bg-[#ddd0f6] border-t-[2px] border-t-white'>
                    <span className='px-4 py-[0.125rem] rounded-lg font-semibold text-2xl text-[#FCFBFE] bg-[#4F21A6] mr-3'>
                      정답
                    </span>
                    <p className='flex items-center gap-3 text-lg font-semibold text-[#504F4E]'>
                      <span className='w-8 h-8 flex items-center justify-center bg-[#A07BE5] text-[#ffffff] text-[1.5rem] font-semibold rounded-full'>
                        {Array.isArray(result.option)
                          ? result.option.findIndex((opt: string) => opt === result.answer) + 1
                          : '-'}
                      </span>
                      <span className='text-3xl text-[#504F4E] font-bold line-through'>{result.answer}</span>
                      <img
                        src='/icon_arrow_modal.svg'
                        alt='arrow'
                      />
                      <span className='underline decoration-[#BFA5ED] decoration-[12px] underline-offset-[-3px] text-3xl font-bold text-[#4F21A6]'>
                        {result.right}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModalChecking;
