'use client';

import { useAuth } from '@/queries/useAuth';
import { useGetWrongAnswer } from '@/queries/useGetWrongAnswer';
import { weekNumber } from '@/utils/week/weekNumber';
import React from 'react';

const AnswerPage = () => {
  const { data: user } = useAuth();
  const { data: answer } = useGetWrongAnswer(user?.id, 'speaking', weekNumber);

  const textArray = answer?.map((item) => JSON.parse(item.answer));
  const wrongAnswerArray = Array.from(
    new Map(textArray?.flat().map((item) => [item.text, { text: item.text, score: item.score }])).values(),
  );

  console.log(answer);
  console.log(textArray);
  console.log(wrongAnswerArray);
  return <div></div>;
};

export default AnswerPage;
