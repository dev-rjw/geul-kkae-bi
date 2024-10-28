'use client';
import { upsertMutation } from '@/mutations/speek-mutation';
import { useAuth } from '@/queries/useAuth';
import speekStore from '@/store/speekStore';
import Link from 'next/link';
import { useEffect } from 'react';
import Timer from './Timer';
import { timStore } from '@/store/timeStore';

type Question = {
  text: string;
  randomText: string[];
  isAudioStop: boolean;
};

const Question = ({ text, randomText, isAudioStop }: Question) => {
  const { index, percent, totlaPercent, setPercent, resetText, resetPercent, incrementIndex, addTotalPercent } =
    speekStore();
  const { time } = timStore();
  const finalPercent = totlaPercent / 10;

  const { data } = useAuth();

  const { mutate } = upsertMutation();

  useEffect(() => {
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

  const handleUpsertScore = () => {
    if (data) {
      mutate({ userId: data.id, score: finalPercent });
      console.log(data.id, finalPercent);
    } else {
      localStorage.setItem('finalPercent', finalPercent.toString());
    }
  };

  return (
    <>
      <Timer handleUpsertScore={handleUpsertScore} />
      <strong className='bg-[#F9BC5F]'>{index + 1}문제</strong>

      {index === 10 || time === 0 ? (
        <>
          <div className='bg-[#fff] w-[800px] h-[200px] flex items-center justify-center mb-[40px]'>
            <p>문제: {randomText[9]}</p>
          </div>
          <div className='bg-[#fff] w-[800px] h-[200px] flex items-center justify-center'>
            <p>정확도 총점</p>
            <span>{finalPercent}</span>
          </div>
          {data ? (
            <>
              <Link
                onClick={handleUpsertScore}
                href={'/games/user?key=speaking'}
              >
                결과 보러가기
              </Link>
            </>
          ) : (
            <Link
              onClick={handleUpsertScore}
              href={'/games/guest?key=speaking'}
            >
              결과 보러가기
            </Link>
          )}
        </>
      ) : (
        <>
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
