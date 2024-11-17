'use client';
import { useDeleteWritingAnswersMutation } from '@/mutations/writing-mutation';
import { useAuth } from '@/queries/useAuth';
import { useFetchWritingWrongAnswer } from '@/queries/writing-fetchQuestions';
import { weekNumber } from '@/utils/week/weekNumber';
import React, { useState } from 'react';

const WritingAnswer = () => {
  const { data: user } = useAuth();
  const userId = user?.id ?? null;
  const { data: writingWrongAnswers = [], isLoading, isError } = useFetchWritingWrongAnswer(userId, weekNumber);
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

  if (isLoading) return <p>로딩중...</p>;
  if (isError) return <p>에러...</p>;

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-[1080px] h-[719px] flex flex-col border rounded-[20px] px-[1.188rem] py-[1.875rem] bg-gray-50'>
        {/* 상단 텍스트 */}
        <div className='flex justify-center items-center mb-6'>
          <h3 className='text-lg font-bold'>완료한 문장은 체크해서 지워주세요!</h3>
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
            ← 이전
          </button>

          {/* 카드 영역 */}
          <div className='w-full'>
            <div className='grid grid-cols-2 gap-6'>
              {paginatedAnswers?.map((answer, index) => (
                <div
                  key={index}
                  className='relative card rounded-lg bg-[#E8F9F3] p-4 flex flex-col gap-4'
                >
                  {/* 체크박스 */}
                  <input
                    type='checkbox'
                    className='absolute top-2 left-2 w-5 h-5'
                    checked={selectedQuestions.includes(answer.question)}
                    onChange={() => handleSelect(answer.question)}
                  />

                  {/* 상단 - 내 오답 */}
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                      <p className='bg-[#FFE6E6] text-[#FF6B6B] font-semibold px-3 py-1 rounded-lg text-sm'>내 오답</p>
                      <p className='text-[#FF6B6B] font-semibold'>{answer.user_answer}</p>
                    </div>
                  </div>

                  {/* 키워드 및 정답 */}
                  <div className='bg-white rounded-lg shadow-md p-3'>
                    <div className='flex justify-between items-center'>
                      <p className='text-[#2AC769] font-semibold'>키워드</p>
                      <h3 className='text-[#2AC769] text-xl font-bold'>{answer.keyword}</h3>
                    </div>
                    <div className='flex justify-center gap-2 mt-2'>
                      {answer.answer?.split('').map((char: string, idx: number) => (
                        <span
                          key={idx}
                          className='bg-[#F8F8F8] text-[#333] text-lg font-bold px-3 py-2 rounded-lg'
                        >
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 질문 및 힌트 */}
                  <div className='bg-[#D7F6EE] rounded-lg p-4'>
                    <p className='text-[#333] text-base font-medium'>{answer.question}</p>
                    <p className='text-[#666] text-sm italic mt-2'>*** {answer.meaning}</p>
                  </div>
                </div>
              ))}
            </div>
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
        <div>
          {/* 삭제 버튼 */}
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className={`p-2 ${isLoading ? 'bg-gray-300' : 'bg-red-500'} text-white`}
          >
            {isLoading ? '삭제 중...' : '선택된 문장 삭제'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritingAnswer;
