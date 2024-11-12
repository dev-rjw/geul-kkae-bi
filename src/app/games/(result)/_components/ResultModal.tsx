import { useWritingQuizStore } from '@/store/writingStore';
import React from 'react';

const ResultModal = () => {
  const results = useWritingQuizStore((state) => state.results);

  return (
    <div>
      <div>
        <h3>ResultsTest</h3>
      </div>
      <div>
        <ul>
          {results.map((result) => {
            return (
              <li key={result.question}>
                <p>{result.question}</p>
                <p>{result.meaning}</p>
                <p>정답:{result.answer}</p>
                <p>입력한 답:{result.userAnswer}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <button onClick={}></button>
    </div>
  );
};

export default ResultModal;
