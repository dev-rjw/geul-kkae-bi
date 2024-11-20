'use client';
import { useDeleteWritingAnswersMutation } from '@/mutations/writing-mutation';
import { useAuth } from '@/queries/useAuth';
import { useFetchWritingWrongAnswer } from '@/queries/writing-fetchQuestions';
import { weekNumber } from '@/utils/week/weekNumber';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const WritingAnswer = () => {
  const { data: user } = useAuth();
  const userId = user?.id ?? null;
  const { data: writingWrongAnswers = [] } = useFetchWritingWrongAnswer(userId, weekNumber);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // 초기 설정
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const paginatedAnswers = isMobile
    ? writingWrongAnswers
    : writingWrongAnswers?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const { mutate: deleteAnswers } = useDeleteWritingAnswersMutation();
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < writingWrongAnswers?.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSelect = (question: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(question) ? prev.filter((q) => q !== question) : [...prev, question],
    );
  };

  const handleDelete = () => {
    if (!userId) {
      alert('유저 정보가 없습니다. 다시 로그인해주세요.');
      return;
    }

    deleteAnswers({ questions: selectedQuestions, userId });
    setSelectedQuestions([]);
  };

  return (
    <div className=' bg-[#7FE6CF]  w-[67.5rem] h-[44.938rem] relative rounded-tr-[1.25rem] rounded-br-[1.25rem] rounded-bl-[1.25rem] max-md:w-full max-md:rounded-br-none max-md:rounded-bl-none overflow-y-auto md:overflow-y-visible'>
      <div className='text-center mt-8 mb-[1.313rem]'>
        <div className='flex items-center justify-center '>
          <strong className='title-24 text-[#198069] max-md:title-16'>완료한 문장은 체크해서 지워주세요!</strong>
          <Image
            src='/icon_write_check.svg'
            width={40}
            height={40}
            alt='check'
            priority
            className='mt-[-10px] max-md:w-[1.5rem] max-md:h-[1.5rem]'
          />
        </div>

        <div className='mt-[1.938rem] flex md:justify-between items-center h-auto md:h-full flex-col md:flex-row'>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className='z-10 absolute top-1/2 left-[1.188rem] transform -translate-y-1/2 hidden md:block'
          >
            <Image
              src={currentPage === 0 ? '/icon_btn_writ_left.svg' : '/icon_btn_writing_left.svg'}
              width={56}
              height={56}
              alt='이전 버튼'
              priority
            />
          </button>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-[0.625rem] mx-auto col-span-full'>
            {!writingWrongAnswers || writingWrongAnswers.length === 0 ? (
              <div className='flex justify-center items-center h-[31.063rem] w-full col-span-full'>
                <p className='title-34 text-[#22AA8D] text-center transform translate-y-[4.438rem] md:translate-y-[0.875rem]'>
                  오답이 아직 모이지 않았어요!
                </p>
              </div>
            ) : (
              <></>
            )}
            {paginatedAnswers?.map((answer, index) => (
              <div
                key={index}
                className='relative card w-[22.375rem] rounded-lg flex flex-col md:w-[27.5rem] h-auto md:h-[15.375rem]'
              >
                <div className='flex justify-between items-center px-[1.063rem] py-3 bg-white h-[3.25rem] mb-[0.188rem] rounded-t-xl'>
                  <div className='flex items-center gap-[0.625rem]'>
                    <p className='bg-[#FCDEDE] text-[#EF5252] font-bold px-[0.875rem] py-[0.125rem] rounded-lg text-base  md:text-lg flex items-center gap-1'>
                      <span className=' text-base md:text-lg font-light'>✖</span> 내 오답
                    </p>
                    <p className='text-[#EF5252] text-[1.375rem] font-semibold'>{answer.user_answer}</p>
                  </div>
                  <div
                    className={`flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-lg ${
                      selectedQuestions.includes(answer.question) ? 'bg-[#198069]' : 'bg-[#aaeedf]'
                    }`}
                  >
                    <input
                      type='checkbox'
                      id={`checkbox-${answer.question}`}
                      className='appearance-none w-full h-full cursor-pointer'
                      checked={selectedQuestions.includes(answer.question)}
                      onChange={() => handleSelect(answer.question)}
                    />
                    <label
                      htmlFor={`checkbox-${answer.question}`}
                      className=' text-[#fcfbfe] font-bold text-xl md:text-[2rem] absolute flex items-center justify-center w-min h-min cursor-pointer'
                      style={{ padding: '2px' }}
                    >
                      ✓
                    </label>
                  </div>
                </div>
                <div className='bg-white h-[6.5rem] px-[0.625rem] flex justify-center items-center gap-10 border-t-[2px] border-t-[#D4F7EF]'>
                  <div className='flex flex-col justify-center items-center mb-3'>
                    <p className='bg-[#7FE6CF] text-[#115546] font-semibold px-[0.875rem] py-[0.125rem] rounded-lg text-base md:text-lg mb-[0.563rem] mt-[1.188rem]'>
                      키워드
                    </p>
                    <p className='text-[#504F4E] font-bold text-xl md:text-2xl'>{answer.consonant}</p>
                  </div>
                  <div className='flex justify-start items-center gap-[0.375rem]'>
                    {answer.answer?.split('').map((char: string, idx: number) => (
                      <span
                        key={idx}
                        className='bg-[#d4f7ef] text-[#504F4E] text-2xl w-12 h-12 md:text-4xl font-bold md:w-[4rem] md:h-[4rem] flex items-center justify-center rounded-lg'
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
                <div className='bg-[#D7F6EE] flex flex-col justify-center items-center rounded-b-lg h-[5.25rem] w-full'>
                  <p className='text-[#504F4E] text-base md:text-xl font-bold'>{answer.question}</p>
                  <p className='text-[#22AA8D] text-sm md:text-base font-medium mt-2'>*** {answer.meaning}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={(currentPage + 1) * itemsPerPage >= writingWrongAnswers.length}
            className=' z-10 absolute top-1/2 right-[1.188rem] transform -translate-y-1/2 hidden md:block'
          >
            <Image
              src={
                (currentPage + 1) * itemsPerPage >= writingWrongAnswers.length
                  ? '/icon_btn_writ_right.svg'
                  : '/icon_btn_writing_right.svg'
              }
              width={56}
              height={56}
              alt='이전 버튼'
              priority
            />
          </button>
        </div>
        <div className='md:relative fixed bottom-0 w-full bg-[#7FE6CF] py-[1.813rem] flex justify-center items-center '>
          <button
            onClick={handleDelete}
            disabled={selectedQuestions.length === 0}
            className={`w-[21.875rem] h-[3.25rem] font-semibold rounded-lg ${
              selectedQuestions.length === 0 ? 'bg-[#AAEEDF] text-[#2AD4AF]' : 'bg-[#198069] text-[#F6FDFC ]'
            }`}
          >
            {selectedQuestions.length === 0 ? '지우기' : `${selectedQuestions.length}개 지우기`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritingAnswer;
