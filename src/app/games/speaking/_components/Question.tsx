'use client';
import { useInsertMutation, useUpdateMutation } from '@/mutations/speek-mutation';
import { useAuth } from '@/queries/useAuth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Timer from './Timer';
import { useGetSpeekDataUser } from '@/queries/useGetSpeekQuery';
import Image from 'next/image';
import { weekNumber } from '@/utils/week/weekNumber';
import { useSpeakStore } from '@/store/speakStore';
import { useTimeStore } from '@/store/timeStore';

type QuestionProps = {
  text: string;
  randomText: string[];
  getWrongAnswer: () => void;
};

const Question = ({ text, randomText, getWrongAnswer }: QuestionProps) => {
  const [result, setResult] = useState(false);
  const {
    index,
    percent,
    totlaPercent,
    isRecording,
    isLoading,
    setPercent,
    resetText,
    resetPercent,
    addIndex,
    addTotalPercent,
    setIsGame,
  } = useSpeakStore();
  const { time } = useTimeStore();
  const { data } = useAuth();
  const { mutate: insert } = useInsertMutation();
  const { mutate: update } = useUpdateMutation();
  const finalPercent = Math.round(totlaPercent / 10);
  const { data: game } = useGetSpeekDataUser(data?.id, weekNumber);

  useEffect(() => {
    if (text && randomText[index]) {
      handleAccuracy(text, randomText[index]);
    }
  }, [text, randomText, index]);

  const handleAccuracy = (text: string | null, randomText: string) => {
    if (text === null) {
      return;
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

  const handleIndex = () => {
    if (index < 9) {
      addIndex();
    } else if (index === 9) {
      handleUpsertScore();
      setResult(true);
      setIsGame(true);
    }
  };

  const handleUpsertScore = () => {
    if (data) {
      if (game && game.length > 0) {
        if (finalPercent > game[0].speaking || game[0].speaking === null) {
          update({ score: finalPercent, userId: game[0].user_id, week: weekNumber });
        }
      } else {
        insert({ userId: data.id, score: finalPercent, weekNumber: weekNumber });
      }
    } else {
      localStorage.setItem('speaking', finalPercent.toString());
    }
  };

  const handleNextButton = () => {
    getWrongAnswer();
    addTotalPercent(percent);
    resetPercent();
    resetText();
    handleIndex();
  };

  return (
    <>
      <Timer
        handleUpsertScore={handleUpsertScore}
        data={data}
        finalPercent={finalPercent}
      />
      <strong className='bg-secondary-300 mt-[5.25rem] rounded-[100px] px-[30px] py-2.5 text-[24px] flex items-center justify-center'>
        {index + 1}번문제
      </strong>
      <div className='bg-secondary-100 flex items-center justify-center mt-12 w-[800px] max-w-[800px] min-h[200px] px-24 py-[2.875rem] text-secondary-700 rounded-[30px]'>
        <p className='text-[36px] font-bold'>{randomText[index]}</p>
      </div>
      {result || time === 0 ? (
        <>
          <div className='bg-[#fff] font-bold mt-8 w-[800px] h-[170px] flex flex-col items-center justify-center rounded-[30px]'>
            <p className='leading-normal text-[36px] text-gray-600'>정확도 총점</p>
            <p className='leading-[1.35] text-[56px] text-primary-400'>
              {finalPercent}
              <span className='text-[36px]'>%</span>
            </p>
          </div>
          <div className='absolute right-[30px] top-[40%] font-bold text-[1.5rem]'>
            <Link
              className='mt-[16px] flex flex-col items-center'
              href={`/games/${
                data ? `user?key=speaking&score=${finalPercent}` : `guest?key=speaking&score=${finalPercent}`
              }`}
            >
              <span className='block mt-[12px]'>결과보기</span>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className='bg-[#fff] font-bold mt-8 w-[800px] h-[170px] flex flex-col items-center justify-center rounded-[30px]'>
            {!isLoading ? (
              <>
                <div className='text-center'>
                  <p className='leading-normal text-[36px] text-gray-600'>정확도</p>
                  <p className='leading-[1.35] text-[56px] text-primary-400'>
                    {percent}
                    <span className='text-[36px]'>%</span>
                  </p>
                </div>
                <div className='absolute right-[30px] flex flex-col items-center top-[40%]'>
                  <p className='text-[1.5rem]'>{index + 1}/10</p>
                  <button
                    className='mt-[16px]'
                    onClick={handleNextButton}
                  >
                    <Image
                      src='/ico_speak_next_btn.svg'
                      width={30}
                      height={30}
                      alt='넘어가기'
                    ></Image>
                  </button>
                </div>
              </>
            ) : (
              <>
                {isRecording ? (
                  <p className='text-[36px] text-gray-600'>녹음중</p>
                ) : (
                  <p className='text-[36px] text-gray-600'>정확도 계산중입니다</p>
                )}
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
