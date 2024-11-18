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
    if (selectedQuestions.length === 0) {
      alert('삭제할 문장을 선택하세요.');
      return;
    }

    if (!userId) {
      alert('유저 정보가 없습니다. 다시 로그인해주세요.');
      return;
    }

    deleteAnswers({ questions: selectedQuestions, userId });
    setSelectedQuestions([]);
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='w-[1080px] h-[719px] flex flex-col rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] px-[1.188rem] py-[1.875rem] bg-[#7FE6CF]'>
        {/* 상단 텍스트 */}
        <div className='flex justify-center items-center mb-6'>
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
            className={`p-2 border rounded ${
              currentPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'
            }`}
          >
            ←
          </button>

          {/* 카드 영역 */}
          <div className='grid grid-cols-2 gap-x-4 gap-y-3 mx-4'>
            {paginatedAnswers?.map((answer, index) => (
              <div
                key={index}
                className='relative card rounded-lg bg-[#E8F9F3] p-4 flex flex-col w-[440px] h-[246px]'
              >
                {/* 상단 - 내 오답 */}
                <div className='flex justify-between items-center h-[52px]'>
                  {/* 왼쪽: "내 오답"과 사용자의 오답 텍스트 */}
                  <div className='flex items-center gap-2'>
                    <p className='bg-[#FFE6E6] text-[#FF6B6B] font-semibold px-3 py-1 rounded-lg text-sm flex items-center gap-1'>
                      <span className='text-[18px] font-bold'>✖</span> {/* X 아이콘 */}내 오답
                    </p>
                    <p className='text-[#FF6B6B] font-semibold'>{answer.user_answer}</p>
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
                <div className='bg-white rounded-lg shadow-md p-5 flex items-start gap-5'>
                  <div className='flex flex-col items-start mb-3'>
                    <p className='bg-[#B7E7CF] text-[#2AC769] font-semibold px-3 py-1 rounded-lg text-sm'>키워드</p>
                    <p className='text-[#333] font-medium text-lg'>{answer.consonant}</p>
                  </div>
                  <div className='flex justify-start gap-[0.375rem]'>
                    {answer.answer?.split('').map((char: string, idx: number) => (
                      <span
                        key={idx}
                        className='bg-[#d4f7ef] text-[#333] text-4xl font-bold w-[4rem] h-[4rem] flex items-center justify-center rounded-lg'
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 질문 및 힌트 */}
                <div className='bg-[#D7F6EE] rounded-lg'>
                  <p className='text-[#333] text-base font-medium'>{answer.question}</p>
                  <p className='text-[#666] text-sm italic mt-2'>*** {answer.meaning}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 오른쪽 버튼 */}
          <button
            onClick={handleNext}
            disabled={(currentPage + 1) * itemsPerPage >= writingWrongAnswers.length}
            className={`p-2 border rounded ${
              (currentPage + 1) * itemsPerPage >= writingWrongAnswers.length
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-700'
            }`}
          >
            다음 →
          </button>
        </div>
        <div className='flex justify-center items-center '>
          {/* 삭제 버튼 */}
          <button
            onClick={handleDelete}
            disabled={selectedQuestions.length === 0}
            className={`w-[21.875rem] h-[3.25rem] font-semibold rounded-lg ${
              selectedQuestions.length === 0
                ? 'bg-[#2AD4AF] text-[#AAEEDF] cursor-not-allowed'
                : 'bg-[#198069] text-[#f6fdfc]'
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
