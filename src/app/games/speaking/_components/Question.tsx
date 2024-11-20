'use client';
import { useInsertMutation, useInsertResultMutation, useUpdateMutation } from '@/mutations/speek-mutation';
import { useAuth } from '@/queries/useAuth';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import Timer from './Timer';
import { useGetSpeekDataUser } from '@/queries/useGetSpeekQuery';
import Image from 'next/image';
import { weekNumber } from '@/utils/week/weekNumber';
import { useSpeakStore } from '@/store/speakStore';
import { useTimeStore } from '@/store/timeStore';
import { SpeekResult } from '@/types/speeking';
import { throttle } from 'lodash';

type QuestionProps = {
  text: string;
  randomText: string[];
  wrongAnswer: SpeekResult[];
  getWrongAnswer: () => void;
};

const Question = ({ text, randomText, wrongAnswer, getWrongAnswer }: QuestionProps) => {
  const { data } = useAuth();
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
    resetTotlaPercent,
  } = useSpeakStore();
  const { time } = useTimeStore();
  const { mutate: insert } = useInsertMutation();
  const { mutate: update } = useUpdateMutation();
  const { mutate: insertResult } = useInsertResultMutation();
  const { data: game } = useGetSpeekDataUser(data?.id, weekNumber);
  const [finalPercent, setFinalPercent] = useState(0);

  useEffect(() => {
    return () => {
      setFinalPercent(0);
      resetTotlaPercent();
    };
  }, []);

  useEffect(() => {
    if (text && randomText[index]) {
      handleAccuracy(text, randomText[index]);
    }
    setFinalPercent(Math.round(totlaPercent / 10));
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
      setResult(true);
      setIsGame(true);
    }
  };

  const handleUpsertScore = () => {
    if (data) {
      if (game && game.length > 0) {
        if (finalPercent > game[0].speaking || game[0].speaking === null) {
          localStorage.setItem('update', finalPercent.toString());
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
    addTotalPercent(percent);
    getWrongAnswer();
    resetPercent();
    resetText();
    handleIndex();
    handleResult();
  };

  const handleResult = useCallback(
    throttle(() => {
      if (percent <= 30)
        insertResult({
          userId: data?.id,
          answer: randomText[index],
          game: 'speaking',
          weekNumber: weekNumber,
          score: percent,
        });
      const dataAnswer = JSON.stringify(wrongAnswer);
      localStorage.setItem('speakingResult', dataAnswer);
      localStorage.setItem('lastGameType', 'speaking');
    }, 2000),
    [wrongAnswer, insertResult],
  );

  return (
    <>
      <Timer
        handleUpsertScore={handleUpsertScore}
        data={data}
        finalPercent={finalPercent}
      />
      <strong className='bg-secondary-300 mt-[5.25rem] rounded-[100px] px-[30px] py-2.5 body-24 flex items-center justify-center max-md:mt-[10.933vw] max-md:py-[0.344rem] max-md:text-[0.875rem]'>
        {index + 1}번 문제
      </strong>
      <div className='bg-secondary-100 flex items-center justify-center mt-12 w-[800px] max-w-[800px] min-h[200px] px-[1.625rem] py-[2.875rem] text-secondary-700 rounded-[30px] max-md:w-full max-md:py-[1.625rem] max-md:rounded-[16px]'>
        <p className='text-[36px] font-bold max-md:text-[16px]'>{randomText[index]}</p>
      </div>
      {result || time === 0 ? (
        <>
          <div className='bg-white font-bold mt-8 w-[800px] h-[170px] flex-cols justify-center rounded-[30px] max-md:w-full max-md:mt-[1.313rem] max-md:h-[100px]'>
            <p className='leading-normal text-[36px] text-gray-600 max-md:text-[16px]'>정확도 총점</p>
            <p className='leading-[1.35] text-[56px] text-primary-400 max-md:text-[32px]'>
              {finalPercent}
              <span className='text-[36px] max-md:text-[1rem]'>%</span>
            </p>
          </div>
          <div className='absolute right-[30px] top-[40%] font-bold text-[1.5rem] max-md:bottom-3.5 max-md:right-1/2 max-md:translate-x-1/2 max-md:top-[auto]'>
            <Link
              onClick={handleUpsertScore}
              className='mt-[16px] flex-cols max-md:w-[22.375Rem] max-md:bg-secondary-300 max-md:py-3 max-md:rounded-[8px]'
              href={`/games/${
                data ? `user?key=speaking&score=${finalPercent}` : `guest?key=speaking&score=${finalPercent}`
              }`}
            >
              <span className='mt-[12px] title-16 max-md:mt-0'>결과보기</span>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className='bg-[#fff] font-bold mt-8 w-[800px] h-[170px] flex-cols justify-center rounded-[30px] max-md:w-full max-md:mt-[1.313rem] max-md:h-[100px]'>
            {!isLoading ? (
              <>
                <div className='text-center'>
                  <p className='leading-normal text-[36px] text-gray-600 max-md:text-[16px]'>정확도</p>
                  <p className='leading-[1.35] text-[56px] text-primary-400 max-md:text-[32px]'>
                    {percent}
                    <span className='text-[36px] max-md:text-[16px]'>%</span>
                  </p>
                </div>
                <div className='absolute right-[30px] flex-cols top-[40%] max-md:bottom-3.5 max-md:right-1/2 max-md:translate-x-1/2 max-md:top-[auto]'>
                  <p className='text-[1.5rem] max-md:hidden'>{index + 1}/10</p>
                  <button
                    className='mt-[16px] max-md:w-[22.375Rem] max-md:bg-secondary-300 max-md:py-3 max-md:rounded-[8px]'
                    onClick={handleNextButton}
                  >
                    <span className='md:hidden title-16 '>다음</span>
                    <Image
                      src='/ico_speak_next_btn.svg'
                      width={30}
                      height={30}
                      alt='다음'
                      className='max-md:hidden'
                    ></Image>
                  </button>
                </div>
              </>
            ) : (
              <>
                {isRecording ? (
                  <p className='text-[36px] text-gray-600 max-md:text-[16px]'>녹음 중입니다</p>
                ) : (
                  <p className='text-[36px] text-gray-600 max-md:text-[16px]'>
                    녹음이 완료되었습니다<br></br> 정확도를 측정중입니다.
                  </p>
                )}
                <div className='absolute right-[30px] max-md:hidden'>
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
