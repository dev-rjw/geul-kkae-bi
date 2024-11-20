'use client';
import React, { useEffect, useState } from 'react';
import { CheckingResult } from '@/types/checking';
import Image from 'next/image';

type Props = {
  handleCloseModal: () => void;
};

const ModalChecking = ({ handleCloseModal }: Props) => {
  const [result, setResult] = useState<CheckingResult[]>([]);
  const [openResult, setOpenResult] = useState<number | null>(null);

  useEffect(() => {
    const checkingResult = localStorage.getItem('checkingQuizResults');
    if (checkingResult) setResult(JSON.parse(checkingResult));
  }, []);

  return (
    <div className='bg-[#BFA5ED] w-[63rem] h-[48rem] rounded-[3.125rem] flex flex-col items-center max-md:w-[358px] max-md:h-[768px] max-md:rounded-[1.25rem]'>
      <h2 className='mt-12 title-40 max-md:font-medium max-md:text-2xl max-md:mt-8'>
        <span className='text-[#8150DD]'>틀린 말 탐정단</span> <span className='text-[#4F21A6]'>오답 공개</span>
      </h2>
      <p className='hidden max-md:block mt-2 body-24 max-md:caption-14 max-md:mt-0'>
        오답은 <span className='text-[#8150DD]'>오답모아 페이지</span> 에서 다시 확인하실 수 있습니다.
      </p>
      <div className='flex justify-center items-start max-md:flex-col max-md:items-center'>
        <ul className='scrollbar-tertiary-p mt-12 w-[50.5rem] max-h-[32.938rem] overflow-auto max-md:w-[100%] max-md:max-h-[600px] max-md:mt-6 pr-[16px] mr-[-16px] max-md:pr-[16px] max-md:mr-[-11px]'>
          {result.map((result, index) => (
            <li
              key={result.test}
              className={`mb-2 ${openResult === index ? 'mb-6' : ''} max-md:mb-4`}
            >
              <div className='flex justify-between items-center h-[5.438rem] px-8 rounded-[0.5rem] bg-[#EFE9FB] max-md:h-[2.813rem] max-md:w-[318px] max-md:px-4 max-md:py-1'>
                <div className='flex items-center max-md:gap-2'>
                  <p className='title-32 font-medium text-[#4F21A6] mr-[2.188rem] max-md:text-xl max-md:mr-2'>
                    {String(index + 1).padStart(2, '0')}번
                  </p>
                  <span className='h-[2.5rem] border-l-[3px] border-[#bfa5ed] mr-[1.438rem] max-md:hidden'></span>
                  <p className='text-3xl font-bold text-[#504F4E] max-md:text-base'>{result.userAnswer}</p>
                  <img
                    src={result.isCorrect ? '/icon_correctanswer_modal.svg' : '/icon_wronganswer_modal.svg'}
                    alt={result.isCorrect ? 'correctanswer' : 'wronganswer'}
                    className='ml-[0.875rem] max-md:w-4 max-md:h-4 max-md:ml-0'
                  />
                </div>
                <button
                  onClick={() => setOpenResult(openResult === index ? null : index)}
                  className='flex items-center py-1 px-6 text-2xl font-medium text-[#FCFBFE] bg-[#A07BE5] rounded-[0.5rem] max-md:text-sm max-md:py-1 max-md:px-3'
                >
                  정답 확인
                  <img
                    src='/icon_btn_chmodal.svg'
                    alt='btn'
                    className='ml-[0.625rem] max-md:w-3 max-md:h-3'
                  />
                </button>
              </div>

              {/* 문제 상세 */}
              {openResult === index && (
                <div className='mt-2 rounded-lg h-[19.938rem] max-md:h-auto'>
                  <div className='bg-[#ddd0f6] p-8 mb-[0.188rem] rounded-t-[0.5rem] max-md:p-5  max-md:w-[318px]'>
                    <div className='flex items-center gap-5 mb-5 max-md:gap-2 max-md:mb-3'>
                      <span className='text-[1.5rem] text-[#6429D1] font-semibold py-[0.125rem] px-4 bg-[#BFA5ED] rounded-[0.5rem] whitespace-nowrap max-md:text-sm max-md:px-2 max-md:hidden'>
                        문제
                      </span>
                      <p className='text-3xl font-bold text-[#504F4E] max-md:text-base md:py-3'>{result.test}</p>
                    </div>
                    <div className='grid grid-cols-2 gap-y-[0.875rem] ml-[94px] w-[400px] max-md:grid-cols-2 max-md:ml-0 max-md:w-full'>
                      {result.option.map((item, optIndex) => (
                        <div
                          key={item}
                          className='flex items-center gap-2 max-md:gap-1'
                        >
                          <span className='w-7 h-7 flex items-center justify-center rounded-full bg-[#A07BE5] text-xl text-white font-bold max-md:w-5 max-md:h-5 max-md:text-xs'>
                            {optIndex + 1}
                          </span>
                          <p className='text-2xl font-semibold text-[#504F4E] max-md:text-sm'>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='flex items-center p-8 rounded-b-[0.5rem] bg-[#ddd0f6] border-t-[2px] border-t-white max-md:p-4'>
                    <span className='px-4 py-[0.125rem] rounded-lg font-semibold text-2xl text-[#FCFBFE] bg-[#8150DD] max-md:text-[#fff] mr-3 max-md:text-sm max-md:px-2'>
                      정답
                    </span>
                    <p className='flex items-center gap-3 text-lg font-semibold text-[#504F4E] max-md:text-sm max-md:gap-1 max-md:font-bold'>
                      <span className='w-8 h-8 flex items-center justify-center bg-[#A07BE5] text-[#ffffff] text-[1.5rem] font-semibold rounded-full max-md:w-5 max-md:h-5 max-md:text-sm max-md:font-bold'>
                        {Array.isArray(result.option)
                          ? result.option.findIndex((opt: string) => opt === result.answer) + 1
                          : '-'}
                      </span>
                      <span className='text-3xl text-[#504F4E] font-bold line-through max-md:text-base'>
                        {result.answer}
                      </span>
                      <img
                        src='/icon_arrow_modal.svg'
                        alt='arrow'
                        className='max-md:w-3 max-md:h-3'
                      />
                      <span className='underline decoration-[#BFA5ED] decoration-[12px] underline-offset-[-3px] text-3xl font-bold text-[#4F21A6] max-md:text-base'>
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
      <button
        className='absolute right-[2.5rem] top-[2.25rem] max-md:right-4 max-md:top-4'
        onClick={handleCloseModal}
      >
        <Image
          src='/icon_close_check.svg'
          width={48}
          height={48}
          alt='모달 닫기'
          className='max-md:w-6 max-md:h-6'
        />
      </button>
    </div>
  );
};

export default ModalChecking;
