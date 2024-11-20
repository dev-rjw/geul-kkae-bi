'use client';
import { useDeleteCheckingAnswersMutation } from '@/mutations/checking-mutation';
import { useFetchCheckingWrongAnswer } from '@/queries/checking-fetchQuestions';
import { useAuth } from '@/queries/useAuth';
import { weekNumber } from '@/utils/week/weekNumber';
import Image from 'next/image';
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
    <div className='bg-tertiary-p-200 w-full h-[44.938rem] relative rounded-[1.25rem] rounded-tl-none max-lg:rounded-b-none max-md:h-auto max-md:min-h-[calc(100vh-6.813rem)]'>
      <div className='flex flex-col h-full text-center pt-8 pb-[2.125rem] max-md:pb-[6.25rem]'>
        <div className='flex items-center justify-center'>
          <div className='title-24 text-tertiary-p-600 flex items-center max-md:text-base'>
            완료한 문장은 체크해서 지워주세요!
          </div>
          <div className='relative w-10 aspect-square ml-1 -mt-2 max-md:w-6'>
            <Image
              src='/icon_check_check.svg'
              alt='check'
              fill
              sizes='2.5rem'
              priority
            />
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div className='flex flex-col justify-between items-center h-full mt-7 px-4 max-md:h-full max-md:flex-row max-md:mt-[1.375rem]'>
          {/* 카드 영역 */}
          <div className='grid grid-cols-2 gap-4 w-full h-full max-w-[56.25rem] mx-auto max-md:grid-cols-1 max-md:gap-3'>
            {paginatedAnswers?.map((answer, index) => (
              <div
                key={index}
                className='relative card rounded-2xl bg-tertiary-p-50 p-5 flex flex-col max-md:p-4 max-md:h-auto'
              >
                {/* 문제 및 선택지 */}
                <div className='flex flex-col gap-4 pb-5 max-md:gap-[0.563rem]'>
                  {/* 문제 헤더 */}
                  <div className='flex justify-between items-center gap-2'>
                    <span className='bg-[#E6D4F2] text-tertiary-p-400 body-18 px-[0.875rem] py-1 rounded-lg max-md:text-sm max-md:py-[0.125rem]'>
                      문제
                    </span>
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-lg max-md:w-6 max-md:h-6 max-md:rounded-sm ${
                        selectedQuestions.includes(answer.question) ? 'bg-tertiary-p-500' : 'bg-tertiary-p-100'
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
                        className=' text-tertiary-p-50 font-bold text-[2rem] absolute flex items-center justify-center w-min h-min cursor-pointer max-md:text-[1.5rem]'
                        style={{ padding: '2px' }}
                      >
                        ✓
                      </label>
                    </div>
                  </div>

                  {/* 문제 텍스트 */}
                  <p className='text-gray-700 text-2xl font-semibold max-md:text-base max-md:text-left'>
                    {answer.question}
                  </p>

                  {/* 선택지 */}
                  <div className='flex flex-col gap-[0.375rem]'>
                    {Array.isArray(answer.correct) &&
                      answer.correct.map((option: string, idx: number) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 px-5 py-3 rounded-md text-gray-700 max-md:py-[0.37rem] ${
                            answer.user_answer === option
                              ? 'bg-[#fcdede] '
                              : option === answer.answer
                              ? 'bg-tertiary-p-100 '
                              : ''
                          }`}
                        >
                          {/* 번호 표시 */}
                          <span className='flex items-center justify-center w-8 h-8 rounded-full bg-tertiary-p-300 text-[1.25rem] text-white font-semibold max-md:w-[1.438rem] max-md:h-[1.438rem] max-md:text-base'>
                            {idx + 1}
                          </span>
                          {/* 옵션 텍스트 */}
                          <span className='text-2xl font-semibold flex items-center justify-between gap-2 max-md:text-base'>
                            {option}
                          </span>
                          {answer.user_answer !== option && option === answer.answer && (
                            <img
                              src='/icon_check_wrong.svg'
                              alt='정답'
                              className='w-4 h-4 ml-auto'
                            />
                          )}
                          {answer.user_answer === option && option !== answer.answer && (
                            <img
                              src='/icon_wronganswer_modal.svg'
                              alt='오답'
                              className='w-4 h-4 ml-auto'
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                {/* 정답 해설 */}
                <div className='absolute bottom-0 left-0 w-full h-[115px] bg-tertiary-p-100 text-[#4A148C] rounded-b-2xl px-5 py-[1.125rem] max-md:relative max-md:w-[calc(100%+2rem)] max-md:h-full max-md:-mx-4 max-md:mt-4 max-md:-mb-4'>
                  <div className='flex items-center mb-2 gap-2'>
                    <span className='bg-tertiary-p-300 text-tertiary-p-50 px-[0.875rem] py-[0.125rem] rounded-lg text-lg font-semibold max-md:text-sm max-md:px-[0.875rem]'>
                      정답해설
                    </span>
                  </div>
                  <div className='flex items-center gap-[0.313rem] max-md:gap-2'>
                    {/* 정답 인덱스 */}
                    <div className='flex items-center gap-2'>
                      <span className='flex items-center justify-center w-8 h-8 rounded-full bg-tertiary-p-300 text-[1.25rem] text-white font-semibold max-md:w-[1.438rem] max-md:h-[1.438rem] max-md:text-base'>
                        {Array.isArray(answer.correct)
                          ? answer.correct.findIndex((opt: string) => opt === answer.answer) + 1
                          : '-'}
                      </span>
                      {/* 정답 */}
                      <span className={`text-gray-700 text-2xl font-semibold line-through max-md:text-base`}>
                        {answer.answer}
                      </span>
                    </div>

                    {/* 화살표 및 해설 */}
                    <span className='text-tertiary-p-300 text-2xl font-semibold max-md:text-base'>→</span>
                    <span className='text-tertiary-p-600 text-2xl font-semibold underline decoration-tertiary-p-200 decoration-[12px] underline-offset-[-3px] max-md:text-base'>
                      {answer.meaning}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 왼쪽 버튼 */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className='absolute top-1/2 left-[1.188rem] -translate-y-1/2 rounded-full flex items-center justify-center'
          >
            <img
              src={currentPage === 0 ? '/icon-btn_check_left.svg' : '/icon_btn_checking_left.svg'}
              alt='이전 버튼'
              className='w-14 h-14'
            />
          </button>
          {/* 오른쪽 버튼 */}
          <button
            onClick={handleNext}
            disabled={(currentPage + 1) * itemsPerPage >= checkingWrongAnswers.length}
            className='absolute top-1/2 right-[1.188rem] -translate-y-1/2 rounded-full flex items-center justify-center'
          >
            <img
              src={
                (currentPage + 1) * itemsPerPage >= checkingWrongAnswers.length
                  ? '/icon-btn_check_right.svg'
                  : '/icon_btn_checking_right.svg'
              }
              alt='다음 버튼'
              className='w-14 h-14'
            />
          </button>
        </div>

        {/* 삭제 버튼 */}
        <div className='flex justify-center items-center pt-[1.688rem] mt-auto max-md:fixed max-md:bottom-0 max-md:left-0 max-md:w-full max-md:px-5 max-md:py-6 max-md:bg-tertiary-p-200'>
          <button
            onClick={handleDelete}
            disabled={selectedQuestions.length === 0}
            className={`w-[21.875rem] h-[3.25rem] body-18 rounded-lg max-md:w-full ${
              selectedQuestions.length === 0
                ? 'bg-tertiary-p-100 text-tertiary-p-200'
                : 'bg-tertiary-p-400 text-tertiary-p-50'
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
