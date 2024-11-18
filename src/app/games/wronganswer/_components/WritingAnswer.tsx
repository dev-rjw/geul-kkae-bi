'use client';
import { useDeleteWritingAnswersMutation } from '@/mutations/writing-mutation';
import { useAuth } from '@/queries/useAuth';
import { useFetchWritingWrongAnswer } from '@/queries/writing-fetchQuestions';
import { weekNumber } from '@/utils/week/weekNumber';
import React, { useState } from 'react';

const WritingAnswer = () => {
  const { data: user } = useAuth();
  const userId = user?.id ?? null;
  const { data: writingWrongAnswers = [] } = useFetchWritingWrongAnswer(userId, weekNumber);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const itemsPerPage = 4;

  const paginatedAnswers = writingWrongAnswers?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
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
    <div className='flex justify-center items-center'>
      <div className='w-[67.5rem] h-[44.938rem] flex flex-col rounded-tr-[1.25rem] rounded-br-[1.25rem] rounded-bl-[1.25rem] px-[1.188rem] py-[1.875rem] bg-[#7FE6CF]'>
        {/* 상단 텍스트 */}
        <div className='flex justify-center items-center'>
          <h3 className='text-[1.5rem] font-bold text-[#198069]'>
            완료한 문장은 체크해서 지워주세요!
            <span className='text-[1.5rem] ml-2'>✓</span>
          </h3>
        </div>

        {/* 콘텐츠 영역 */}
        <div className='flex justify-between items-center h-full'>
          {/* 왼쪽 버튼 */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className={`w-[3.5rem] h-[3.5rem] rounded-full ${
              currentPage === 0 ? 'bg-[#55DDBF] text-[#7FE6CF]' : 'bg-[#55DDBF] text-white'
            }`}
          >
            &lt;
          </button>

          {/* 카드 영역 */}
          <div className='grid grid-cols-2 gap-x-4 gap-y-[0.625rem] max-auto'>
            {paginatedAnswers?.map((answer, index) => (
              <div
                key={index}
                className='relative card rounded-lg flex flex-col w-[27.5rem] h-[15.375rem]'
              >
                {/* 상단 - 내 오답 */}
                <div className='flex justify-between items-center px-[1.063rem] py-3 bg-white h-[3.25rem] mb-[0.188rem] rounded-t-xl'>
                  {/* 왼쪽: "내 오답"과 사용자의 오답 텍스트 */}
                  <div className='flex items-center gap-[0.625rem]'>
                    <p className='bg-[#FCDEDE] text-[#EF5252] font-bold px-[0.875rem] py-[0.125rem] rounded-lg text-lg flex items-center gap-1'>
                      <span className='text-lg font-light'>✖</span> {/* X 아이콘 */}내 오답
                    </p>
                    <p className='text-[#EF5252] text-[1.375rem] font-semibold'>{answer.user_answer}</p>
                  </div>

                  {/* 오른쪽: 체크박스 */}
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-lg ${
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
                    {/* 체크 표시 */}
                    <label
                      htmlFor={`checkbox-${answer.question}`}
                      className=' text-[#fcfbfe] font-bold text-[2rem] absolute flex items-center justify-center w-min h-min cursor-pointer'
                      style={{ padding: '2px' }}
                    >
                      ✓
                    </label>
                  </div>
                </div>

                {/* 키워드 및 정답 */}
                <div className='bg-white h-[6.5rem] px-[0.625rem] flex justify-center items-center gap-10'>
                  <div className='flex flex-col justify-center items-center mb-3'>
                    <p className='bg-[#7FE6CF] text-[#115546] font-semibold px-[0.875rem] py-[0.125rem] rounded-lg text-lg mb-[0.563rem] mt-[1.188rem]'>
                      키워드
                    </p>
                    <p className='text-[#504F4E] font-bold text-2xl'>{answer.consonant}</p>
                  </div>
                  <div className='flex justify-start items-center gap-[0.375rem]'>
                    {answer.answer?.split('').map((char: string, idx: number) => (
                      <span
                        key={idx}
                        className='bg-[#d4f7ef] text-[#504F4E] text-4xl font-bold w-[4rem] h-[4rem] flex items-center justify-center rounded-lg'
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 질문 및 힌트 */}
                <div className='bg-[#D7F6EE] flex flex-col justify-center items-center rounded-b-lg h-[5.25rem] w-full'>
                  <p className='text-[#504F4E] text-xl font-bold'>{answer.question}</p>
                  <p className='text-[#22AA8D] text-base font-medium mt-2'>*** {answer.meaning}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 오른쪽 버튼 */}
          <button
            onClick={handleNext}
            disabled={(currentPage + 1) * itemsPerPage >= writingWrongAnswers.length}
            className={`w-[3.5rem] h-[3.5rem] rounded-full ${
              (currentPage + 1) * itemsPerPage >= writingWrongAnswers.length
                ? 'bg-[#55DDBF] text-[#7FE6CF]'
                : 'bg-[#55DDBF] text-white'
            }`}
          >
            <span className='text-2xl'>&gt;</span>
          </button>
        </div>
        <div className='flex justify-center items-center '>
          {/* 삭제 버튼 */}
          <button
            onClick={handleDelete}
            disabled={selectedQuestions.length === 0}
            className={`w-[21.875rem] h-[3.25rem] font-semibold rounded-lg ${
              selectedQuestions.length === 0 ? 'bg-[#2AD4AF] text-[#AAEEDF]' : 'bg-[#198069] text-[#f6fdfc]'
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
