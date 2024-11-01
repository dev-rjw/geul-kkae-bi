'use client';
import { useInsertMutation, useUpdateMutation } from '@/mutations/speek-mutation';
import { useAuth } from '@/queries/useAuth';
import speekStore from '@/store/speekStore';
import Link from 'next/link';
import { useEffect } from 'react';
import Timer from './Timer';
import { timStore } from '@/store/timeStore';
import { useGetSpeekDataUser } from '@/queries/useGetSpeekQuery';

type Question = {
  text: string;
  randomText: string[];
};

const Question = ({ text, randomText }: Question) => {
  const {
    index,
    percent,
    totlaPercent,
    isLoading,
    setPercent,
    resetText,
    resetPercent,
    incrementIndex,
    addTotalPercent,
  } = speekStore();
  const { time } = timStore();
  const { data } = useAuth();
  const { mutate } = useInsertMutation();
  const { mutate: update } = useUpdateMutation();
  const finalPercent = Math.round(totlaPercent / 10);
  const startSeason = new Date(2024, 9, 27);
  const now = new Date();
  const weekNumber = Math.floor((now.getTime() - startSeason.getTime()) / 604800000) + 1;
  const { data: game } = useGetSpeekDataUser(data?.id, weekNumber);

  useEffect(() => {
    // text와 randomText가 모두 설정된 후에만 정확도 계산 실행
    if (text && randomText[index]) {
      onclickAccuracy(text, randomText[index]);
    }
  }, [text, randomText, index]);

  const onclickAccuracy = function calculateAccuracy(text: string | null, randomText: string) {
    if (text === null) {
      text = '';
    }
    const maxLength = Math.max(text.length, randomText.length);
    const matchText = text
      .split('')
      .slice(0, Math.min(text.length, randomText.length))
      .map((text, index) => (text === randomText[index] ? 1 : 0))
      .reduce((acc: number, curr: number) => acc + curr, 0);
    const point = Math.round((matchText / maxLength) * 100);
    setPercent(point);
  };

  const handleUpsertScore = () => {
    if (data) {
      if (game && game.length > 0) {
        if (finalPercent > game[0].speaking) {
          update({ score: finalPercent, userId: game[0].user_id, week: weekNumber });
        }
      } else {
        mutate({ userId: data.id, score: finalPercent, weekNumber: weekNumber });
      }
    } else {
      localStorage.setItem('speaking', finalPercent.toString());
    }
  };

  return (
    <>
      <button onClick={handleUpsertScore}>결과보기</button>
      <Timer handleUpsertScore={handleUpsertScore} />
      <strong className='bg-[#F9BC5F] mt-[84px] rounded-[100px] w-[140px] h-[56px] flex items-center justify-center'>
        {index + 1}문제
      </strong>
      <div className='bg-[#fff] mt-[20px] w-[800px] h-[200px] flex items-center justify-center mb-[40px]'>
        <p className='text-[36px] font-bold'>{randomText[index]}</p>
      </div>
      {index === 9 || time === 0 ? (
        <>
          <div className='bg-[#fff] font-bold w-[800px] h-[200px] flex-col flex items-center justify-center'>
            <p className='text-[36px] text-[#6a6967]'>정확도 총점</p>
            <p className='text-[56px] text-[#357ee7]'>
              {finalPercent}
              <span className='text-[36px]'>%</span>
            </p>
          </div>
          {data ? (
            <Link
              onClick={handleUpsertScore}
              href={`/games/user?key=speaking&score=${finalPercent}`}
            >
              결과 보러가기
            </Link>
          ) : (
            <Link
              onClick={handleUpsertScore}
              href={`/games/guest?key=speaking&score=${finalPercent}`}
            >
              결과 보러가기
            </Link>
          )}
        </>
      ) : (
        <>
          <div className='bg-[#fff] font-bold w-[800px] h-[200px] flex flex-col items-center justify-center'>
            {!isLoading ? (
              <>
                <p className='text-[36px] text-[#6a6967]'>정확도</p>
                <p className='text-[56px] text-[#357ee7]'>
                  {percent}
                  <span className='text-[36px]'>%</span>
                </p>
                <div className='absolute right-[30px]'>
                  <p>{index + 1}/10</p>
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
                </div>
              </>
            ) : (
              <>
                <p className='text-[36px] text-[#6a6967]'>정확도 계산중입니다</p>
                <div className='absolute right-[30px]'>
                  <p>{index + 1}/10</p>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Question;
