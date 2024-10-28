'use client';
import speekStore from '@/store/speekStoreStore';
import Link from 'next/link';
import { useEffect } from 'react';

type Question = {
  text: string;
  randomText: string[];
  isAudioStop: boolean;
};

const Question = ({ text, randomText, isAudioStop }: Question) => {
  const { index, percent, totlaPercent, setPercent, resetText, resetPercent, incrementIndex, addTotalPercent } =
    speekStore();
  const finalPercent = totlaPercent / 10;

  useEffect(() => {
    localStorage.setItem('finalPercent', finalPercent.toString());
    // text와 randomText가 모두 설정된 후에만 정확도 계산 실행
    if (text && randomText[index]) {
      onclickAccuracy(text, randomText[index]);
    }
  }, [text, randomText, index]);

  const onclickAccuracy = function calculateAccuracy(text: string | null, randomText: string) {
    if (text === null) {
      return;
    }

    const maxLength = Math.max(text.length, randomText.length);
    let matches = 0;

    for (let i = 0; i < Math.min(text.length, randomText.length); i++) {
      if (text[i] === randomText[i]) {
        matches++; // 같은 위치의 문자가 일치하면 카운트 증가
      }
    }

    const point = Math.round((matches / maxLength) * 100);
    console.log(point);

    setPercent(point);
  };

  return (
    <>
      {index == 10 ? (
        <>
          <strong>10문제</strong>
          <div className='bg-[#fff] w-[800px] h-[200px] flex items-center justify-center mb-[40px]'>
            <p>문제: {randomText[9]}</p>
          </div>
          <div className='bg-[#fff] w-[800px] h-[200px] flex items-center justify-center'>
            <p>정확도 총점</p>
            <span>{finalPercent}</span>
          </div>
          <Link href={'/shop?type=Speek'}>결과 보러가기</Link>
        </>
      ) : (
        <>
          <strong className='bg-[#F9BC5F]'>{index + 1}문제</strong>
          <div className='bg-[#fff] w-[800px] h-[200px] flex items-center justify-center mb-[40px]'>
            <p>문제: {randomText[index]}</p>
          </div>
          <div className='bg-[#fff] w-[800px] h-[200px] flex items-center justify-center'>
            <p>정확도 총점</p>
            <span>{percent}</span>
          </div>
          {!isAudioStop ? null : (
            <button
              onClick={() => {
                addTotalPercent(percent);
                resetPercent();
                resetText();
                incrementIndex();
              }}
            >
              넘어가기
            </button>
          )}
        </>
      )}
    </>
  );
};

export default Question;
