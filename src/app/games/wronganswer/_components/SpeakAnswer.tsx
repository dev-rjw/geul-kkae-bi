'use client';
import { useAuth } from '@/queries/useAuth';
import { useGetWrongAnswer } from '@/queries/useGetWrongAnswer';
import { weekNumber } from '@/utils/week/weekNumber';
import { useState } from 'react';
import Pagintaion from './Pagination';

const SpeakAnswer = () => {
  const { data: user } = useAuth();
  const { data: answer } = useGetWrongAnswer(user?.id, weekNumber);
  const [currentPage, setCurrentPage] = useState(1);
  const contentsPerPage = 5;

  //   const textArray = answer?.map((item) => JSON.parse(item.answer));
  //   const creat_at = answer?.map((item) => item.created_at);
  //   const mergeArray = textArray?.map((data, index) => ({
  //     data,
  //     date: creat_at?.[index],
  //   }));
  //   //정렬 데이터 수정
  //   const sortedDataArray = mergeArray?.map((item) => item.data);

  answer?.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date).getTime() - new Date(b.date).getTime(); // 날짜 비교
  });

  const answerData = answer?.filter(
    (item, index, array) => array.findIndex((obj) => obj.answer === item.answer) === index,
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  //   const wrongAnswerArray = Array.from(
  //     new Map(sortedDataArray?.flat().map((item) => [item.text, { text: item.text, score: item.score }])).values(),
  //   );

  const indexOfLastContent = currentPage * contentsPerPage;
  const indexOfFirstContent = indexOfLastContent - contentsPerPage;
  const wrongAnswer = answerData?.slice(0).reverse().slice(indexOfFirstContent, indexOfLastContent);

  console.log('슈퍼베이스에 틀린거 다 불러온 정보 중복제거', answerData);
  console.log('슈퍼베이스에 틀린거 다 불러온 정보', answer);
  //   console.log('틀린 문제들 배열', textArray);
  //   console.log('날짜', creat_at);
  //   console.log('순서 정렬', mergeArray);
  //   console.log('순서 정렬 데이터', sortedDataArray);
  //   console.log('오답 최종 배열', wrongAnswerArray);
  //   console.log('보여줄 오답 배열', currentContents);
  return (
    <div>
      {wrongAnswer?.map((speak) => (
        <div key={speak.id}>
          <p className=''>{speak.answer}</p>
          <span>{speak.score}</span>
        </div>
      ))}
      <Pagintaion
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </div>
  );
};

export default SpeakAnswer;
