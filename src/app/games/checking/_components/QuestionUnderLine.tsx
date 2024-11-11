import { QuestionUnderlineProps } from '@/types/checking';
import React from 'react';

const QuestionUnderLine: React.FC<QuestionUnderlineProps> = ({ question, correct, selectedOption }) => {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  correct.forEach((phrase: string, index: number) => {
    const phraseIndex = question.indexOf(phrase, lastIndex);

    if (phraseIndex !== -1) {
      if (lastIndex < phraseIndex) {
        parts.push(<span key={lastIndex}>{question.slice(lastIndex, phraseIndex)}</span>);
      }

      const isSelected = selectedOption === phrase;
      parts.push(
        <span
          key={phraseIndex}
          className={`underline underline-offset-8 ${
            isSelected ? 'decoration-[#A07BE5]' : 'decoration-[#357EE7] '
          } relative`}
        >
          {phrase}
          <span
            className={`font-pretendard absolute -bottom-7 left-1/2 transform -translate-x-1/2 flex w-[1.625rem] h-[1.625rem] ${
              isSelected ? 'bg-[#A07BE5]' : 'bg-[#357EE7]'
            } text-[1.3125rem] text-white items-center justify-center rounded-full`}
          >
            {index + 1}
          </span>
        </span>,
      );

      lastIndex = phraseIndex + phrase.length;
    }
  });

  if (lastIndex < question.length) {
    parts.push(<span key='end'>{question.slice(lastIndex)}</span>);
  }

  return <p>{parts}</p>;
};

export default QuestionUnderLine;
