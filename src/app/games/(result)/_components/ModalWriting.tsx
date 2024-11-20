import { PartialQuestion } from '@/types/writing';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Props = {
  handleCloseModal: () => void;
};

const ModalWriting = ({ handleCloseModal }: Props) => {
  const [result, setResult] = useState<PartialQuestion[]>([]);
  const [openResult, setOpenResult] = useState<number | null>(null);

  useEffect(() => {
    const writingResult = localStorage.getItem('writingQuizResults');
    if (writingResult) setResult(JSON.parse(writingResult));
  }, []);

  return (
    <div className='w-[1002px] h-[792px] rounded-[1.25rem] bg-[#7fe6cf] flex flex-col items-center max-md:w-[358px] max-md:h-[768px] md:rounded-[3.125rem]'>
      <h2 className='mt-12 title-40 max-md:mt-8 max-md:text-[1.5rem] max-md:font-medium'>
        <span className='text-[#22AA8D]'>빈칸 한 입</span> <span className='text-[#198069]'>오답 공개</span>
      </h2>
      <p className='hidden max-md:block mt-2 body-24 max-md:caption-14 max-md:mt-0'>
        오답은 <span className='text-[#22AA8D]'>오답모아 페이지</span> 에서 다시 확인하실 수 있습니다.
      </p>
      <div className='flex justify-center items-start max-md:w-full max-md:px-4'>
        <ul className='mt-[1.188rem] md:mt-8 w-[836px] h-[559px] overflow-auto max-md:w-full max-md:h-[620px] scrollbar-tertiary-g pr-[16px] mr-[-16px] max-md:pr-[9px] max-md:mr-[-11px]'>
          {result.map((result, index) => (
            <li
              key={result.test}
              className='mb-4 max-md:mb-2'
            >
              <div className='flex justify-between items-center h-[45px] md:h-[87px] px-8 py-4 rounded-[0.5rem] mb-2 bg-[#F6FDFC] max-md:px-3 max-md:py-2 max-md:h-auto'>
                <div className='flex items-center max-md:flex-row max-md:items-center max-md:gap-2 max-md:h-[45px]'>
                  <p className='title-32 font-medium text-[#115546] md:text-[#363635] mr-[2.688rem] max-md:mr-0 max-md:text-[1.25rem]'>
                    {String(index + 1).padStart(2, '0')}번
                  </p>
                  <span className='h-[2.5rem] border-l-[3px] border-[#AAEEDF] mr-[1.188rem] max-md:mr-0 max-md:ml-0 max-md:hidden'></span>
                  <p className='text-[2rem] font-medium text-[#363635] max-md:text-base'>{result.userAnswer}</p>
                  <img
                    src={result.isCorrect ? '/icon_correctanswer_modal.svg' : '/icon_wronganswer_modal.svg'}
                    alt={result.isCorrect ? 'correctanswer' : 'wronganswer'}
                    className='ml-[14px] max-md:ml-2 max-md:w-[24px] max-md:h-[24px]'
                  />
                </div>
                <button
                  onClick={() => setOpenResult(openResult === index ? null : index)}
                  className='flex items-center px-3 py-[0.188rem] md:px-6 md:py-1 text-2xl text-[#F6FDFC] bg-[#22AA8D] rounded-[0.5rem] max-md:text-[1rem] max-md:px-3 max-md:py-1'
                >
                  정답 확인
                  <img
                    src='/icon_btn_modal.svg'
                    alt='button icon'
                    className='ml-[14px] max-md:ml-2 max-md:w-3 max-md:h-3'
                  />
                </button>
              </div>

              {openResult === index && (
                <div className=' h-[18.938rem] mb-4 max-md:h-auto'>
                  <div className='bg-[#D4F7EF] p-8 rounded-t-[0.5rem] mb-[0.188rem] max-md:p-4 max-md:flex max-md:flex-col max-md:justify-center max-md:items-center'>
                    <div className='flex items-center mb-[1.063rem] gap-[1.438rem] max-md:gap-4 max-md:justify-center'>
                      <span className='px-4 py-[0.125rem] text-2xl font-semibold text-[#115546] bg-[#2AD4AF] rounded-lg max-md:text-[1rem] max-md:hidden'>
                        키워드
                      </span>
                      <p className='text-[1.875rem] text-[#504F4E] font-bold max-md:text-3xl'>{result.keyword}</p>
                    </div>
                    <div className='flex flex-col items-start max-md:items-center'>
                      <div className='flex items-center gap-[2.688rem] max-md:gap-2 max-md:justify-center'>
                        <span className='px-4 py-[0.125rem] text-2xl font-semibold text-[#115546] bg-[#2AD4AF] rounded-lg max-md:text-[1rem] max-md:hidden'>
                          예시
                        </span>
                        <p className='text-[1.875rem] text-[#504F4E] font-bold max-md:text-[1rem]'>{result.test}</p>
                      </div>
                      <p className='text-[#22AA8D] text-[20px] ml-[117px] max-md:ml-0 max-md:mt-2 max-md:text-[0.875rem]'>
                        ***{result.meaning}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className='flex items-center p-8 bg-[#D4F7EF] border-t-[2px] border-t-white rounded-b-[0.5rem] max-md:p-4'>
                      <span className='px-4 py-[0.125rem] text-2xl font-semibold text-[#FFF] bg-[#22AA8D] rounded-lg mr-[2.625rem] max-md:mr-3 max-md:text-sm'>
                        정답
                      </span>
                      <p className='text-[1.875rem] font-bold text-[#504F4E] max-md:text-[1rem]'>{result.answer}</p>
                    </div>
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
          src='/icon_close_write.svg'
          width={48}
          height={48}
          alt='모달 닫기'
          className='max-md:w-6 max-md:h-6'
        ></Image>
      </button>
    </div>
  );
};

export default ModalWriting;
