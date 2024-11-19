'use client';
import browserClient from '@/utils/supabase/client';
import React, { useEffect, useRef, useState } from 'react';
import QuizTimer from './_components/QuizTimer';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Image from 'next/image';
import './style.css';
import { useAuth } from '@/queries/useAuth';
import { useFetchQuestions } from '@/queries/checking-fetchQuestions';
import {
  useInsertCheckingMutation,
  useInsertCheckingResultMutation,
  useUpdateCheckingMutation,
} from '@/mutations/checking-mutation';
import CheckingButton from './_components/CheckingButton';
import QuestionUnderLine from './_components/QuestionUnderLine';
import { weekNumber } from '@/utils/week/weekNumber';
import { CheckingQuestion, CheckingResult } from '@/types/checking';
import { Loader2 } from 'lucide-react';

const CheckingQuizPage = () => {
  const { data: user } = useAuth();
  const userId = user?.id ?? null;
  const { data: questions = [], isLoading } = useFetchQuestions();
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const question: CheckingQuestion = questions[currentQuizIndex];
  const scoreRef = useRef(0);
  const allResults = useRef<CheckingResult[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAllQuestions, setIsAllQuestions] = useState(false);
  const router = useRouter();
  const insertScoreMutation = useInsertCheckingMutation();
  const updateScoreMutation = useUpdateCheckingMutation();
  const inserCheckingResultMutation = useInsertCheckingResultMutation();

  const handleResize = () => setIsMobile(window.innerWidth <= 750);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const saveResultsToLocalStorage = (results: CheckingResult[]) => {
    localStorage.setItem('checkingQuizResults', JSON.stringify(results));
    localStorage.setItem('lastGameType', 'checking');
  };

  const moveToNextQuiz = () => {
    if (isTimeOver || isAllQuestions) return;

    handleCheckAnswer();
    if (currentQuizIndex < questions.length - 1) {
      setCurrentQuizIndex((index) => index + 1);
      setSelectedOption(null);
    } else {
      saveScore(scoreRef.current);
      saveResultsToLocalStorage(allResults.current);
      setIsAllQuestions(true);
    }
  };

  const moveToCheckingResultPage = (score: number) => {
    if (userId) {
      router.push(`/games/user?key=checking&score=${score}`);
    } else {
      router.push(`/games/guest?key=checking&score=${score}`);
    }
  };

  const handleCheckAnswer = () => {
    const currentResult: CheckingResult = {
      test: questions[currentQuizIndex].question,
      option: questions[currentQuizIndex].correct,
      answer: questions[currentQuizIndex].answer,
      right: questions[currentQuizIndex].meaning,
      userAnswer: selectedOption,
      isCorrect: selectedOption === questions[currentQuizIndex].answer,
      gameType: 'checking',
    };

    allResults.current.push(currentResult);

    if (!currentResult.isCorrect && userId) {
      inserCheckingResultMutation.mutate({
        userId: userId,
        answer: question.answer,
        question: question.question,
        game: 'checking',
        week: weekNumber,
        meaning: question.meaning,
        useranswer: selectedOption,
        correct: question.correct,
      });
    }

    if (selectedOption === questions[currentQuizIndex].answer) {
      scoreRef.current += 10;
    }
  };

  const saveScore = async (score: number) => {
    if (userId) {
      const { data: currentScore, error } = await browserClient
        .from('rank')
        .select('id, checking')
        .eq('user_id', userId)
        .eq('week', weekNumber);

      if (error) {
        console.error('기존 데이터를 가져오지 못했습니다.', error);
        return;
      }

      if (currentScore && currentScore.length > 0) {
        if (score > currentScore[0].checking || currentScore[0].checking === null) {
          updateScoreMutation.mutate({ score, userId, week: weekNumber });
        }
      } else {
        insertScoreMutation.mutate({ score, userId, weekNumber: weekNumber });
      }
    } else {
      localStorage.setItem('checking', score.toString());
    }
  };

  const handleTimeOver = () => {
    if (!isTimeOver) {
      saveScore(scoreRef.current);
      setIsTimeOver(true);
      Swal.fire({
        html: `
        <div class="swal-custom-text">시간이 다 됐다 깨비!</div>
        <div class="swal-custom-text">다음에 다시 도전하라 깨비</div>
        `,
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text',
          confirmButton: 'swal-custom-button',
          popup: 'swal2-popup',
        },
        confirmButtonText: '확인',
        willClose: () => {
          moveToCheckingResultPage(scoreRef.current);
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <Loader2 className='mr-2 h-12 w-12 animate-spin text-primary-400' />
      </div>
    );
  }

  return (
    <div>
      <QuizTimer
        onTimeOver={handleTimeOver}
        isAllQuestions={isAllQuestions}
        isMobile={isMobile}
      />
      <div className={`flex-1 flex flex-col items-center justify-center ${isMobile ? 'mt-10' : 'mt-20'}`}>
        <p
          className={`inline-flex items-center justify-center ${
            isMobile
              ? 'px-4 py-2 bg-tertiary-p-300 text-base mt-[4.5rem]'
              : 'px-[1.875rem] py-2.5 bg-tertiary-p-300 text-2xl'
          } font-medium rounded-full`}
        >
          {`${currentQuizIndex + 1}번 문제`}
        </p>
        <p
          className={`${
            isMobile ? 'mt-6 mb-8 text-lg text-center text-[#363635]' : 'mt-[3.25rem] mb-20 text-2xl'
          } font-medium font-yangjin text-[#363635]`}
        >
          문장에서 틀린 부분을 고르세요
        </p>
        <div
          className={`${
            isMobile ? 'text-lg pb-10 leading-6' : 'text-4xl pb-[10.1875rem]'
          } font-medium text-[#363635] font-yangjin`}
        >
          <QuestionUnderLine
            question={questions[currentQuizIndex].question}
            selectedOption={selectedOption}
            correct={questions[currentQuizIndex].correct}
            isMobile={isMobile}
          />
        </div>
        <CheckingButton
          correctOptions={questions[currentQuizIndex].correct}
          selectedOption={selectedOption}
          onselect={setSelectedOption}
          isMobile={isMobile}
        />
      </div>
      <div
        className={`absolute ${
          isMobile
            ? 'bottom-4 left-1/2 transform -translate-x-1/2'
            : 'top-1/2 right-[1.25rem] transform -translate-y-1/2'
        } flex flex-col items-center font-yangjin`}
      >
        {!(isTimeOver || isAllQuestions) ? (
          <div className='flex flex-col items-center'>
            {!isMobile && <p className='self-center text-2xl font-medium mb-2'>{`${currentQuizIndex + 1}/10`}</p>}
            <button
              onClick={moveToNextQuiz}
              className={`${
                isMobile
                  ? 'w-[22.375rem] h-[3rem] bg-tertiary-p-300 text-[#271051] text-lg font-medium rounded-md'
                  : 'px-4 py-2'
              }`}
            >
              {isMobile ? (
                '다음'
              ) : (
                <Image
                  src='/icon_btn_checking.svg'
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
            onClick={() => moveToCheckingResultPage(scoreRef.current)}
            className={`${
              isMobile
                ? 'w-[22.375rem] h-[3rem] text-base mt-4 font-medium bg-tertiary-p-300 px-4 py-2 rounded'
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

export default CheckingQuizPage;
