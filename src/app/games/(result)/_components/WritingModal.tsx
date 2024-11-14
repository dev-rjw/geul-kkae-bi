import { PartialQuestion } from '@/types/writing';
import React, { useEffect, useState } from 'react';

const WritingModal = () => {
  const [result, setResult] = useState<PartialQuestion[]>([]);
  const [openResult, setOpenResult] = useState<number | null>(null);

  useEffect(() => {
    const writingResult = localStorage.getItem('writingQuizResults');
    if (writingResult) setResult(JSON.parse(writingResult));
  }, []);

  return (
    <div className='flex justify-center items-start'>
      <ul className='mt-[100px] w-[836px] max-h-[559px] overflow-auto'>
        {result.map((result, index) => (
          <li
            key={result.test}
            className='mb-2'
          >
            <div className='flex justify-between items-center h-[87px] px-8 rounded-[8px] mb-2 bg-[#F6FDFC]'>
              <div className='flex items-center'>
                <p className='text-[32px] font-medium text-[#363635] mr-4'>{String(index + 1).padStart(2, '0')}번</p>
                <p className='text-[32px] font-medium text-[#363635]'>{result.userAnswer}</p>
                <img
                  src={result.isCorrect ? '/icon_correctanswer_modal.svg' : '/icon_wronganswer_modal.svg'}
                  alt={result.isCorrect ? 'correctanswer' : 'wronganswer'}
                  className='ml-[14px]'
                />
              </div>
              <button
                onClick={() => setOpenResult(openResult === index ? null : index)}
                className='flex items-center px-6 py-1 text-2xl text-[#F6FDFC] bg-[#22AA8D] rounded-[8px]'
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
              <div className='bg-[#D4F7EF] pl-[29px] pt-[34px] pb-8 rounded-[8px] h-[250px]'>
                <div className='flex items-center mb-[17px] gap-[23px]'>
                  <span className='px-4 py-[2px] text-2xl font-semibold text-[#115546] bg-[#2AD4AF] rounded'>
                    키워드
                  </span>
                  <p className='ml-2 text-[30px] text-[#504F4E]'>{result.keyword}</p>
                </div>
                <div className='flex items-center mb-2 gap-[43px]'>
                  <span className='px-4 py-[2px] text-2xl font-semibold text-[#115546] bg-[#2AD4AF] rounded'>예시</span>
                  <p className='ml-2 text-[30px] text-[#504F4E]'>{result.test}</p>
                </div>
                <p className='ml-10 text-[#22AA8D] mb-4 text-[20px]'>***{result.meaning}</p>
                <div className='flex items-center mt-[17px] gap-[43px]'>
                  <span className='px-4 py-[2px] text-2xl font-semibold text-[#FFF] bg-[#22AA8D] rounded'>정답</span>
                  <p className='ml-2 text-[30px] font-semibold text-[#504F4E]'>{result.answer}</p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WritingModal;
