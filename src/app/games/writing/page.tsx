'use client';
import browserClient from '@/utils/supabase/client';
import React, { useRef, useState } from 'react';
import QuizTimer from './_components/QuizTimer';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import ConsonantCard from './_components/ConsonantCard';
import './style.css';
import Image from 'next/image';
import { useAuth } from '@/queries/useAuth';
import { useFetchQuestions } from '@/queries/writing-fetchQuestions';
import { useInsertWritingMutation, useUpdateWritingMutation } from '@/mutations/writing-mutation';
import { weekNumber } from '@/utils/week/weekNumber';
//import { useWritingQuizStore } from '@/store/writingStore';
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
  const allResults = useRef<PartialQuestion[]>([]);
  const question: Question = questions[currentQuizIndex];
  const router = useRouter();
  const insertScoreMutation = useInsertWritingMutation();
  const updateScoreMutation = useUpdateWritingMutation();
  //const addWritingResult = useWritingQuizStore((state) => state.addWritingResult);

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
      //addWritingResult([...allResults.current]);
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
    };
    allResults.current.push(currentResult);

    if (userAnswer === question.answer) {
      scoreRef.current += 10;
    }
  };
  const saveResultsToLocalStorage = (results: PartialQuestion[]) => {
    localStorage.setItem('writingQuizResults', JSON.stringify(results));
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
      />
      <div className='flex flex-col items-center justify-center mt-20'>
        <p className='inline-flex items-center justify-center px-[1.875rem] py-2.5 bg-tertiary-g-500 text-2xl font-medium rounded-full font-Pretendard'>{`${
          currentQuizIndex + 1
        }번문제`}</p>
        <p className='mt-[4.25rem] mb-10 text-4xl font-medium font-yangjin'>
          해당 자음을 보고 제시한 문장에 어울리는 단어를 적어주세요.
        </p>
        <ConsonantCard consonants={question.consonant} />
        <div className='flex flex-col justify-center items-center h-[12.5rem] mt-10 p-2.5 font-yangjin'>
          <p className='text-4xl font-medium mb-[1.6875rem]'>{question.question}</p>
          <p className='text-2xl font-medium text-tertiary-g-500'>{`**${question.meaning}`}</p>
        </div>
        <form onSubmit={moveToNextQuiz}>
          <input
            type='text'
            placeholder='정답을 입력하고 엔터를 치세요'
            ref={userInputRef}
            className='pt-16 border-b border-black focus:outline-none text-xl font-medium w-80 font-yangjin'
          />
        </form>
      </div>

      <div className='absolute top-[387px] right-[1.25rem] flex flex-col items-center font-yangjin'>
        {!(isTimeOver || isAllQuestions) ? (
          <div className='flex flex-col items-center'>
            <p className='text-center text-2xl font-medium mb-2'>{`${currentQuizIndex + 1}/10`}</p>
            <button
              onClick={moveToNextQuiz}
              className='px-4 py-2'
            >
              <Image
                src='/icon_btn_writing.svg'
                alt='nextbutton'
                width={48}
                height={48}
                style={{ width: 'auto', height: 'auto' }}
              />
            </button>
          </div>
        ) : (
          <button
            onClick={() => moveToWritingResultPage(scoreRef.current)}
            className='text-2xl font-medium'
          >
            결과 보기
          </button>
        )}
      </div>
    </div>
  );
};

export default WritingQuizPage;
