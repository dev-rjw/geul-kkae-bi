'use client';
import browserClient from '@/utils/supabase/client';
import React, { useEffect, useRef, useState } from 'react';
import QuizTimer from './_components/QuizTimer';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import ConsonantCard from './_components/ConsonantCard';
import './style.css';
import Image from 'next/image';
import { useAuth } from '@/queries/useAuth';
import { useFetchQuestions } from '@/queries/writing-fetchQuestions';
import {
  useInsertWritingMutation,
  useInsertWritingResultMutation,
  useUpdateWritingMutation,
} from '@/mutations/writing-mutation';
import { weekNumber } from '@/utils/week/weekNumber';
import { PartialQuestion, Question } from '@/types/writing';

const WritingQuizPage = () => {
  const { data: user } = useAuth();
  const userId = user?.id ?? null;
  const { data: questions = [], isLoading } = useFetchQuestions();
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const scoreRef = useRef(0);
  const [isAllQuestions, setIsAllQuestions] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const allResults = useRef<PartialQuestion[]>([]);
  const question: Question = questions[currentQuizIndex];
  const router = useRouter();
  const insertScoreMutation = useInsertWritingMutation();
  const updateScoreMutation = useUpdateWritingMutation();
  const insertWritingResultMutation = useInsertWritingResultMutation();

  const handleResize = () => setIsMobile(window.innerWidth <= 750);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moveToNextQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const userInput = userInputRef.current?.value || '';
    if (isTimeOver || isAllQuestions) return;

    handleCheckAnswer(userInput);
    if (userInputRef.current) {
      userInputRef.current.value = '';
    }

    if (currentQuizIndex < questions.length - 1) {
      setCurrentQuizIndex((index) => index + 1);
    } else {
      saveScore(scoreRef.current);
      saveResultsToLocalStorage(allResults.current);
      moveToWritingResultPage(scoreRef.current);
      setIsAllQuestions(true);
    }
  };

  const moveToWritingResultPage = (score: number) => {
    if (userId) {
      router.push(`/games/user?key=writing&score=${score}`);
    } else {
      router.push(`/games/guest?key=writing&score=${score}`);
    }
  };

  const handleCheckAnswer = (userAnswer: string) => {
    const currentResult = {
      test: question.question,
      meaning: question.meaning,
      keyword: question.consonant,
      answer: question.answer,
      userAnswer: userAnswer,
      isCorrect: userAnswer === question.answer,
      gameType: 'writing',
    };
    allResults.current.push(currentResult);

    if (!currentResult.isCorrect && userId) {
      insertWritingResultMutation.mutate({
        userId: userId,
        answer: question.answer,
        question: question.question,
        game: 'writing',
        consonant: question.consonant,
        week: weekNumber,
        meaning: question.meaning,
        useranswer: userAnswer,
      });
    }

    if (userAnswer === question.answer) {
      scoreRef.current += 10;
    }
  };
  const saveResultsToLocalStorage = (results: PartialQuestion[]) => {
    localStorage.setItem('writingQuizResults', JSON.stringify(results));
    localStorage.setItem('lastGameType', 'writing');
  };

  const saveScore = async (score: number) => {
    if (userId) {
      const { data: currentScore, error } = await browserClient
        .from('rank')
        .select('id, writing')
        .eq('user_id', userId)
        .eq('week', weekNumber);

      if (error) {
        console.error('기존 데이터를 가져오지 못했습니다.', error);
        return;
      }

      if (currentScore && currentScore.length > 0) {
        if (score > currentScore[0].writing || currentScore[0].writing === null) {
          updateScoreMutation.mutate({ score, userId, week: weekNumber });
        }
      } else {
        insertScoreMutation.mutate({ score, userId, weekNumber: weekNumber });
      }
    } else {
      localStorage.setItem('writing', score.toString());
    }
  };

  const handleTimeOver = () => {
    if (!isTimeOver) {
      saveScore(scoreRef.current);
      setIsTimeOver(true);
      Swal.fire({
        html: '<div>시간이 다 됐다 깨비!<br/>다음에 다시 도전하라 깨비</div>',
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text',
          confirmButton: 'swal-custom-button',
        },
        confirmButtonText: '확인',
        willClose: () => {
          moveToWritingResultPage(scoreRef.current);
        },
      });
    }
  };

  if (isLoading) {
    return <p>로딩중</p>;
  }

  return (
    <div>
      <QuizTimer
        onTimeOver={handleTimeOver}
        isAllQuestions={isAllQuestions}
        isMobile={isMobile}
      />
      <div className={`flex flex-col items-center ${isMobile ? 'mt-10' : 'mt-20'}`}>
        <p
          className={`inline-flex items-center justify-center px-[1.875rem] py-2.5 text-2xl font-medium rounded-full ${
            isMobile ? 'bg-tertiary-g-500 text-xl mt-[4.5rem]' : 'bg-tertiary-g-500'
          }`}
        >
          {`${currentQuizIndex + 1}번문제`}
        </p>
        <p
          className={`${
            isMobile
              ? 'mt-8 mb-6 text-xl px-6 text-center text-[#363635]'
              : 'mt-[4.25rem] mb-10 text-4xl text-[#363635]'
          } font-medium font-yangjin`}
        >
          해당 자음을 보고 제시한 문장에 어울리는 단어를 적어주세요.
        </p>
        <ConsonantCard
          consonants={question.consonant}
          isMobile={isMobile}
        />
        <div
          className={`flex flex-col justify-center items-center ${
            isMobile ? 'h-auto mt-[3.688rem] p-4' : 'h-[12.5rem] mt-10 p-2.5'
          } font-yangjin`}
        >
          <p
            className={`${isMobile ? 'text-2xl mb-[1.688rem]' : 'text-4xl mb-[1.6875rem]'} font-medium text-[#363635]`}
          >
            {question.question}
          </p>
          <p className={`${isMobile ? 'text-base' : 'text-2xl'} font-medium text-tertiary-g-500`}>
            {`**${question.meaning}`}
          </p>
        </div>
        <form
          onSubmit={moveToNextQuiz}
          className={`${isMobile ? 'w-full px-4 mt-[4.25rem]' : ''}`}
        >
          <input
            type='text'
            placeholder='정답을 입력하고 엔터를 치세요'
            ref={userInputRef}
            className={`border-b border-black focus:outline-none ${
              isMobile ? 'text-base py-2' : 'text-xl pt-16'
            } font-medium w-full font-yangjin`}
          />
        </form>
      </div>

      <div
        className={`absolute ${
          isMobile
            ? 'bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center'
            : 'top-[387px] right-[1.25rem] flex flex-col items-center'
        } font-yangjin`}
      >
        {!(isTimeOver || isAllQuestions) ? (
          <div className='flex flex-col items-center'>
            {!isMobile && <p className='text-center text-2xl font-medium mb-2'>{`${currentQuizIndex + 1}/10`}</p>}
            <button
              onClick={moveToNextQuiz}
              className={`${
                isMobile
                  ? 'w-[22.375rem] h-[3rem] bg-[#55DDBF] text-[#115546] text-[1rem] font-normal rounded-md'
                  : 'p-3'
              }`}
            >
              {isMobile ? (
                '다음'
              ) : (
                <Image
                  src='/icon_btn_writing.svg'
                  alt='nextbutton'
                  width={48}
                  height={48}
                  style={{ width: 'auto', height: 'auto' }}
                />
              )}
            </button>
          </div>
        ) : (
          <button
            onClick={() => moveToWritingResultPage(scoreRef.current)}
            className={`${
              isMobile
                ? 'w-[22.375rem] h-[3rem] text-base mt-4 font-medium bg-tertiary-g-400 px-4 py-2 rounded'
                : 'text-2xl font-medium'
            }`}
          >
            {isMobile ? '결과 보기' : '결과 보기'}
          </button>
        )}
      </div>
    </div>
  );
};

export default WritingQuizPage;
