'use client';
import TextData from '@/mock/speak';
import { useEffect, useState } from 'react';

type text = {
  text: string | null;
};

const Question = ({ text }: text) => {
  const [index, setIndex] = useState(0);
  const [randomText, setRandomText] = useState<string[]>([]);
  const [percent, setPercent] = useState(0);
  const [totlaPercent, setTotalPercent] = useState(0);

  function getRandomSentences(textArray: string[]) {
    return textArray.sort(() => Math.random() - 0.5).slice(0, 10);
  }

  useEffect(() => {
    const questions = getRandomSentences(TextData);
    setRandomText(questions);
    console.log(questions);
  }, []);

  const onclickAccuracy = function calculateAccuracy(str1: string | null, str2: string) {
    const maxLength = Math.max(str1.length, str2.length);
    let matches = 0;

    for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
      if (str1[i] === str2[i]) {
        matches++; // 같은 위치의 문자가 일치하면 카운트 증가
      }
    }

    setPercent((matches / maxLength) * 100);
  };

  return (
    <div>
      <p>{randomText[index]}</p>
      <p>{percent}</p>
      <p>{text}</p>
      <button onClick={() => onclickAccuracy(text, randomText[0])}>클릭하기</button>
      <button
        onClick={() => {
          setIndex(index + 1);
          setTotalPercent(totlaPercent + percent);
          setPercent(0);
        }}
      >
        넘어가기
      </button>
      <p>{totlaPercent}</p>
    </div>
  );
};

export default Question;
