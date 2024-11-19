'use client';
import { useAuth } from '@/queries/useAuth';
import { useGetWrongAnswer } from '@/queries/useGetWrongAnswer';
import { weekNumber } from '@/utils/week/weekNumber';
import { useState } from 'react';
import Pagintaion from './Pagination';
import { useDeleteSpeakAnswersMutation } from '@/mutations/speek-mutation';

const SpeakAnswer = () => {
  const { data: user } = useAuth();
  const { data: answer } = useGetWrongAnswer(user?.id, weekNumber);
  const { mutate: del } = useDeleteSpeakAnswersMutation();
  const [selecteAnswer, setSelectedAnswer] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const contentsPerPage = 5;
  const answerData = answer?.filter(
    (item, index, array) => array.findIndex((obj) => obj.answer === item.answer) === index,
  );
  answerData?.sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime(); // 날짜 비교
  });
  const indexOfLastContent = currentPage * contentsPerPage;
  const indexOfFirstContent = indexOfLastContent - contentsPerPage;
  const wrongAnswer = answerData?.reverse().slice(0).slice(indexOfFirstContent, indexOfLastContent);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleSelect = (question: string) => {
    setSelectedAnswer((prev) => (prev.includes(question) ? prev.filter((q) => q !== question) : [...prev, question]));
  };
  return (
    <div className='bg-secondary-300 w-[67.5rem] h-[44.938rem] relative'>
      <div className='text-center mt-8 mb-[1.313rem]'>
        <strong className='title-24 text-secondary-700'>완료한 문장은 체크해서 지워주세요!</strong>
        <p className='text-gray-700'>
          발음 문제는 <span className='text-secondary-600'>30% 이하</span> 점수만 오답으로 책정됩니다.
        </p>
      </div>
      <div className='w-[56.125rem] mx-auto'>
        {wrongAnswer?.map((speak) => (
          <div
            key={speak.id}
            className='flex items-center bg-[#FEF2E0] py-4 mb-3.5 rounded-lg '
          >
            <p className='text-secondary-500 w-[8.688rem] h-[3.25rem] leading-[3.25rem] pt-1 text-center title-36'>
              <span>{speak.score}</span>
              <span className='text-[1rem]'>%</span>
            </p>
            <p className='body-24'>{speak.answer}</p>
            <div className='ml-auto'>
              <input
                type='checkbox'
                id={`checkbox-${speak.answer}`}
                className='input-box hidden'
                checked={selecteAnswer.includes(speak.answer)}
                onChange={() => handleSelect(speak.answer)}
              />
              <label
                htmlFor={`checkbox-${speak.answer}`}
                className='w-[3.125rem] h-[3.125rem] check-label inline-block'
              ></label>
            </div>
          </div>
        ))}
        <div className='mt-[1.875rem] text-center'>
          <button
            className='w-[21.875rem] h-[3.25rem] bg-secondary-500 rounded-lg'
            onClick={() => del({ answer: selecteAnswer, userId: user?.id })}
          >
            <span className='text-secondary-100 body-18'>
              {selecteAnswer.length === 0 ? null : <span>{selecteAnswer.length}개 </span>}삭제하기
            </span>
          </button>
        </div>
      </div>
      <Pagintaion
        currentPage={currentPage}
        totalItems={answerData?.length}
        contentsPerPage={contentsPerPage}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </div>
  );
};

export default SpeakAnswer;
