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
    <div className='w-[1008px] h-[768px] rounded-[3.125rem] bg-[#7fe6cf] flex flex-col items-center'>
      <h2 className='mt-12 title-40 font-medium'>
        <span className='text-[#22AA8D]'>빈칸 한 입</span> <span className='text-[#198069]'>오답 공개</span>
      </h2>
      <div className='flex justify-center items-start'>
        <ul className='mt-12 w-[836px] max-h-[559px] overflow-auto'>
          {result.map((result, index) => (
            <li
              key={result.test}
              className='mb-4'
            >
              <div className='flex justify-between items-center h-[87px] px-8 py-4 rounded-[0.5rem] mb-2 bg-[#F6FDFC]'>
                <div className='flex items-center'>
                  <p className='text-[2rem] font-medium text-[#363635] mr-[2.688rem]'>
                    {String(index + 1).padStart(2, '0')}번
                  </p>
                  <span className='h-[2.5rem] border-l-[3px] border-[#AAEEDF] mr-[1.188rem]'></span>
                  <p className='text-[2rem] font-medium text-[#363635]'>{result.userAnswer}</p>
                  <img
                    src={result.isCorrect ? '/icon_correctanswer_modal.svg' : '/icon_wronganswer_modal.svg'}
                    alt={result.isCorrect ? 'correctanswer' : 'wronganswer'}
                    className='ml-[14px]'
                  />
                </div>
                <button
                  onClick={() => setOpenResult(openResult === index ? null : index)}
                  className='flex items-center px-6 py-1 text-2xl text-[#F6FDFC] bg-[#22AA8D] rounded-[0.5rem]'
                >
                  정답 확인
                  <img
                    src='/icon_btn_modal.svg'
                    alt='button icon'
                    className='ml-[14px]'
                  />
                </button>
              </div>

              {openResult === index && (
                <div className=' h-[18.938rem] mb-4'>
                  <div className='bg-[#D4F7EF] p-8 rounded-t-[0.5rem] mb-[0.188rem]'>
                    <div className='flex items-center mb-[1.063rem] gap-[1.438rem]'>
                      <span className='px-4 py-[0.125rem] text-2xl font-semibold text-[#115546] bg-[#2AD4AF] rounded-lg'>
                        키워드
                      </span>
                      <p className='text-[1.875rem] text-[#504F4E] font-bold'>{result.keyword}</p>
                    </div>
                    <div className='flex flex-col items-start'>
                      <div className='flex items-center gap-[2.688rem]'>
                        <span className='px-4 py-[0.125rem] text-2xl font-semibold text-[#115546] bg-[#2AD4AF] rounded-lg'>
                          예시
                        </span>
                        <p className='text-[1.875rem] text-[#504F4E] font-bold'>{result.test}</p>
                      </div>
                      <p className='text-[#22AA8D] text-[20px] ml-[117px]'>***{result.meaning}</p>
                    </div>
                  </div>
                  <div>
                    <div className='flex items-center p-8 bg-[#D4F7EF] border-t-[2px] border-t-white rounded-b-[0.5rem]'>
                      <span className='px-4 py-[0.125rem] text-2xl font-semibold text-[#FFF] bg-[#22AA8D] rounded-lg mr-[2.625rem]'>
                        정답
                      </span>
                      <p className='text-[1.875rem] font-semibold text-[#504F4E]'>{result.answer}</p>
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
          priority
        ></Image>
      </button>
    </div>
  );
};

export default ModalWriting;
