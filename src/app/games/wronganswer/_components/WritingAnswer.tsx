'use client';
import { useAuth } from '@/queries/useAuth';
import { useFetchhWritingWrongAnswer } from '@/queries/writing-fetchQuestions';
import { weekNumber } from '@/utils/week/weekNumber';
import React from 'react';

const WritingAnswer = () => {
  const { data: user } = useAuth();
  const userId = user?.id ?? null;
  const { data: writingWrongAnswers, isLoading, isError } = useFetchhWritingWrongAnswer(userId, weekNumber);

  if (isLoading) return <p>로딩중...</p>;
  if (isError) return <p>에러...</p>;

  return (
    <div>
      <ul>
        {writingWrongAnswers?.map((answer) => {
          return (
            <li key={answer.question}>
              <p>{answer.question}</p>
              <p>{answer.consonant}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WritingAnswer;
