import React from 'react';

interface QuestionUnderlineProps {
  question: string;
  correct: string[];
  selectedOption: string | null;
}

const QuestionUnderLine: React.FC<QuestionUnderlineProps> = ({ question, correct, selectedOption }) => {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  correct.forEach((phrase: string, index: number) => {
    const phraseIndex = question.indexOf(phrase, lastIndex);

    if (phraseIndex !== -1) {
      // phrase 전의 일반 텍스트 추가
      if (lastIndex < phraseIndex) {
        parts.push(<span key={lastIndex}>{question.slice(lastIndex, phraseIndex)}</span>);
      }

      // phrase에 밑줄과 번호 추가
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

  // 마지막 남은 텍스트 추가
  if (lastIndex < question.length) {
    parts.push(<span key='end'>{question.slice(lastIndex)}</span>);
  }

  return <p>{parts}</p>;
};

export default QuestionUnderLine;
