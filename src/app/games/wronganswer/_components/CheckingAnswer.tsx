'use client';
import { useDeleteCheckingAnswersMutation } from '@/mutations/checking-mutation';
import { useFetchCheckingWrongAnswer } from '@/queries/checking-fetchQuestions';
import { useAuth } from '@/queries/useAuth';
import { weekNumber } from '@/utils/week/weekNumber';
import { useState } from 'react';

const CheckingAnswer = () => {
  const { data: user } = useAuth();
  const userId = user?.id ?? null;
  const { data: checkingWrongAnswers = [], isLoading, isError } = useFetchCheckingWrongAnswer(userId, weekNumber);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const itemsPerPage = 2;

  const paginatedAnswers = checkingWrongAnswers?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const { mutate: deleteAnswers } = useDeleteCheckingAnswersMutation();

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < checkingWrongAnswers?.length) {
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

  if (isLoading) return <p>로딩중...</p>;
  if (isError) return <p>에러...</p>;

  return (
    <div className='flex justify-center items-center'>
      <div className='w-[1080px] h-[719px] flex flex-col border rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] px-[1.188rem] py-[1.875rem] bg-[#bfa5ed]'>
        {/* 상단 텍스트 */}
        <div className='flex justify-center items-center mb-6'>
          <h3 className='text-[1.5rem] font-bold text-[#4f21a6]'>
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
              currentPage === 0 ? 'bg-[#A07BE5] text-[#BFA5ED]' : 'bg-[#A07BE5] text-white'
            }`}
          >
            &lt;
          </button>

          {/* 카드 영역 */}
          <div className='grid grid-cols-2 gap-4 mx-4'>
            {paginatedAnswers?.map((answer, index) => (
              <div
                key={index}
                className='relative card rounded-2xl bg-[#fcfbfe] p-5 flex flex-col border h-[509px] w-[442px]'
              >
                <div className='flex justify-between items-center'></div>

                {/* 문제 및 선택지 */}
                <div className='flex flex-col gap-4'>
                  {/* 문제 헤더 */}
                  <div className='flex justify-between items-center gap-2'>
                    <span className='bg-[#E6D4F2] text-[#8150dd] font-semibold px-[0.875rem] py-1 rounded-lg text-lg'>
                      문제
                    </span>
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                        selectedQuestions.includes(answer.question) ? 'bg-[#6429d1]' : 'bg-[#ddd0f6]'
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

                  {/* 문제 텍스트 */}
                  <p className='text-[#504f4e] text-2xl font-semibold'>{answer.question}</p>

                  {/* 선택지 */}
                  <div className='flex flex-col gap-[0.375rem]'>
                    {Array.isArray(answer.correct) &&
                      answer.correct.map((option: string, idx: number) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 px-5 py-2 rounded-md text-[#504f4e] ${
                            answer.user_answer === option
                              ? 'bg-[#fcdede] '
                              : option === answer.answer
                              ? 'bg-[#ddd0f6] '
                              : ''
                          }`}
                        >
                          {/* 번호 표시 */}
                          <span className='flex items-center justify-center w-8 h-8 rounded-full bg-[#A07BE5] text-white font-bold'>
                            {idx + 1}
                          </span>
                          {/* 옵션 텍스트 */}
                          <span className='text-2xl font-medium flex items-center justify-between gap-2'>
                            {option}
                            {answer.user_answer !== option && option === answer.answer && (
                              <span className='text-[#4F21A6] font-bold text-base'>O</span>
                            )}
                            {answer.user_answer === option && option !== answer.answer && (
                              <span className='text-[#EF5252] font-bold text-base'>X</span>
                            )}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* 정답 해설 */}
                <div className='absolute bottom-0 left-0 w-full h-[115px] bg-[#ddd0f6] text-[#4A148C] rounded-b-2xl px-5 py-[1.125rem] '>
                  <div className='flex items-center mb-2 gap-2'>
                    <span className='bg-[#a07be5] text-[#fcfbfe] px-[0.875rem] py-[0.125rem] rounded-lg text-lg font-semibold'>
                      정답 해설
                    </span>
                  </div>
                  <div className='flex items-center gap-[0.313rem]'>
                    {/* 정답 인덱스 */}
                    <div className='flex items-center gap-2'>
                      <span className='w-6 h-6 flex items-center justify-center bg-[#a07be5] text-[#ffffff] font-bold rounded-full'>
                        {Array.isArray(answer.correct)
                          ? answer.correct.findIndex((opt: string) => opt === answer.answer) + 1
                          : '-'}
                      </span>
                      {/* 정답 */}
                      <span className={`text-[#504f4e] text-2xl line-through`}>{answer.answer}</span>
                    </div>

                    {/* 화살표 및 해설 */}
                    <span className='text-[#a07be5] text-2xl font-semibold'>→</span>
                    <span className='text-[#4f21a6] text-2xl font-semibold underline decoration-[#b39ddb] decoration-'>
                      {answer.meaning}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 오른쪽 버튼 */}
          <button
            onClick={handleNext}
            disabled={(currentPage + 1) * itemsPerPage >= checkingWrongAnswers.length}
            className={`w-[3.5rem] h-[3.5rem] rounded-full ${
              (currentPage + 1) * itemsPerPage >= checkingWrongAnswers.length
                ? 'bg-[#A07BE5] text-[#BFA5ED]'
                : 'bg-[#A07BE5] text-white'
            }`}
          >
            &gt;
          </button>
        </div>

        {/* 삭제 버튼 */}
        <div className='flex justify-center items-center mt-4'>
          <button
            onClick={handleDelete}
            disabled={selectedQuestions.length === 0}
            className={`w-[21.875rem] h-[3.25rem] font-semibold rounded-lg ${
              selectedQuestions.length === 0 ? 'bg-[#D1C4E9] text-[#B39DDB]' : 'bg-[#8150DD] text-white'
            }`}
          >
            {selectedQuestions.length === 0 ? '지우기' : `${selectedQuestions.length}개 지우기`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckingAnswer;
