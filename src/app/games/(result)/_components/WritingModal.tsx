import { PartialQuestion } from '@/types/writing';
import React, { useEffect, useState } from 'react';

const WritingModal = () => {
  const [result, setResult] = useState<PartialQuestion[]>([]);
  const [openResult, setOpenResult] = useState<number | null>(null);

  useEffect(() => {
    const writingResult = localStorage.getItem('writingQuizResults');
    if (writingResult) setResult(JSON.parse(writingResult));
  }, []);

  return (
    <div>
      <ul>
        {result.map((result, index) => {
          return (
            <li key={result.test}>
              <div className='flex justify-end items-center'>
                <p>입력한 답: {result.userAnswer}</p>
                <button onClick={() => setOpenResult(openResult === index ? null : index)}>정답 확인</button>
              </div>
              {openResult === index && (
                <div>
                  <p>키워드 {result.keyword} </p>
                  <p>문제 {result.test}</p>
                  <p>{result.meaning}</p>
                  <p>정답 {result.answer}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WritingModal;
