'use client';
import { useAuth } from '@/queries/useAuth';
import { useGetWrongAnswer } from '@/queries/useGetWrongAnswer';
import { weekNumber } from '@/utils/week/weekNumber';
import { useState } from 'react';
import Pagintaion from './Pagination';
import { useDeleteSpeakAnswersMutation } from '@/mutations/speek-mutation';
import Image from 'next/image';

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
    <div className='bg-secondary-300 w-[67.5rem] h-[44.938rem] relative rounded-tr-[1.25rem] rounded-br-[1.25rem] rounded-bl-[1.25rem]'>
      <div className='text-center mt-8 mb-[1.313rem]'>
        <div className='flex items-center justify-center'>
          <strong className='title-24 text-secondary-700'>완료한 문장은 체크해서 지워주세요!</strong>
          <Image
            src='/icon_speak_answer_check.svg'
            width={40}
            height={40}
            alt='check'
            priority
            className='mt-[-10px]'
          />
        </div>
        <p className='text-gray-700 font-bold'>
          발음 문제는 <span className='text-secondary-600'>30% 이하</span> 점수만 오답으로 책정됩니다.
        </p>
      </div>
      <div className='w-[56.125rem] mx-auto'>
        {!answer || answer.length === 0 ? (
          <div className='h-[31.063rem] flex items-center justify-center'>
            <p className='title-34 text-secondary-500'>오답이 아직 모이지 않았어요!</p>
          </div>
        ) : (
          <></>
        )}
        {wrongAnswer?.map((speak) => (
          <div
            key={speak.id}
            className={`${
              selecteAnswer.includes(speak.answer) ? 'bg-secondary-200' : ''
            } flex items-center bg-[#FEF2E0] py-4 mb-3.5 rounded-lg`}
          >
            <p className='relative text-secondary-500 w-[8.688rem] h-[3.25rem] leading-[3.25rem] pt-1 text-center title-36 before:absolute before:top-1/2 before:right-0 before:translate-y-[-50%] before:w-[0.313rem] before:h-[3.188rem] before:bg-[#FFB440]'>
              <span>{speak.score}</span>
              <span className='text-[1rem]'>%</span>
            </p>
            <p className='body-24 pl-[1.563rem]'>{speak.answer}</p>
            <div className='ml-auto mr-8 flex items-center'>
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
          {selecteAnswer.length === 0 ? (
            <span className='inline-flex items-center justify-center w-[21.875rem] h-[3.25rem] bg-secondary-200 rounded-lg body-18 text-secondary-400'>
              지우기
            </span>
          ) : (
            <button
              className='w-[21.875rem] h-[3.25rem] bg-secondary-500 rounded-lg'
              onClick={() => del({ answer: selecteAnswer, userId: user?.id })}
            >
              <p className='text-secondary-100 body-18'>
                {selecteAnswer.length === 0 ? null : <span>{selecteAnswer.length}개 </span>}지우기
              </p>
            </button>
          )}
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
