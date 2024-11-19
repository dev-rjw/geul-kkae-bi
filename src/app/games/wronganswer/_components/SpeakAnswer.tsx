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
    <div>
      {wrongAnswer?.map((speak) => (
        <div key={speak.id}>
          <p>{speak.answer}</p>
          <span>{speak.score}</span>
          <div>
            <input
              type='checkbox'
              id={`checkbox-${speak.answer}`}
              checked={selecteAnswer.includes(speak.answer)}
              onChange={() => handleSelect(speak.answer)}
            />
            <label htmlFor={`checkbox-${speak.answer}`}></label>
          </div>
        </div>
      ))}
      <button onClick={() => del({ answer: selecteAnswer, userId: user?.id })}>삭제하기</button>
      <Pagintaion
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </div>
  );
};

export default SpeakAnswer;
