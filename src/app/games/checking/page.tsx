'use client';
import browserClient from '@/utils/supabase/client';
import React, { useRef, useState } from 'react';
import QuizTimer from './_components/QuizTimer';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import './style.css';
import Image from 'next/image';
import { useAuth } from '@/queries/useAuth';
import { useFetchQuestions } from '@/queries/checking-fetchQuestions';
import { useInsertCheckingMutation, useUpdateCheckingMutation } from '@/mutations/checking-mutation';
import CheckingButton from './_components/CheckingButton';
import QuestionUnderLine from './_components/QuestionUnderLine';

const CheckingQuizPage = () => {
  const { data: user } = useAuth();
  const userId = user?.id ?? null;
  const { data: questions = [], isLoading } = useFetchQuestions();
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const scoreRef = useRef(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [isAllQuestions, setIsAllQuestions] = useState(false);
  const router = useRouter();
  const insertScoreMutation = useInsertCheckingMutation();
  const updateScoreMutation = useUpdateCheckingMutation();

  // 다음 문제로 넘어가기, 퀴즈 클리어
  const moveToNextQuiz = () => {
    if (isTimeOver || isAllQuestions) return;

    handleCheckAnswer();

    if (currentQuizIndex < questions.length - 1) {
      setCurrentQuizIndex((index) => index + 1);
      setSelectedOption(null);
    } else {
      saveScore(scoreRef.current);
      setIsAllQuestions(true);
    }
  };

  const moveToWritingResultPage = (score: number) => {
    if (userId) {
      router.push(`/games/user?key=checking&score=${score}`);
    } else {
      router.push(`/games/guest?key=checking&score=${score}`);
    }
  };

  // 정답 확인
  const handleCheckAnswer = () => {
    if (selectedOption === questions[currentQuizIndex].answer) {
      scoreRef.current += 10;
    }
  };

  // 점수 저장
  const saveScore = async (score: number) => {
    const startSeason = new Date(2024, 9, 27);
    const now = new Date();
    const weekNumber = Math.floor((now.getTime() - startSeason.getTime()) / 604800000) + 1;

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
        insertScoreMutation.mutate({ score, userId, weekNumber });
      }
    } else {
      localStorage.setItem('checking', score.toString());
    }
  };

  // 시간 초과
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
      <div className='flex-1 flex flex-col items-center justify-center mt-20'>
        <p className=' inline-flex items-center justify-center px-[1.875rem] py-2.5 bg-[#A07BE5] text-2xl font-medium rounded-full'>{`${
          currentQuizIndex + 1
        }번 문제`}</p>
        <p className=' mt-[3.25rem] mb-20 text-2xl font-medium font-yangjin'>문장에서 틀린 부분을 고르세요</p>
        <div className=' text-4xl font-medium pb-[10.1875rem] font-yangjin'>
          <QuestionUnderLine
            question={questions[currentQuizIndex].question}
            selectedOption={selectedOption}
            correct={questions[currentQuizIndex].correct}
          />
        </div>
        <CheckingButton
          correctOptions={questions[currentQuizIndex].correct}
          selectedOption={selectedOption}
          onselect={setSelectedOption}
        />
      </div>
      <div className=' absolute top-1/2 right-[1.25rem] transform -translate-y-1/2 flex flex-col items-center font-yangjin'>
        {!(isTimeOver || isAllQuestions) ? (
          <div className='flex flex-col items-center'>
            <p className='self-center text-2xl font-medium mb-2'>{`${currentQuizIndex + 1}/10`}</p>
            <button
              onClick={moveToNextQuiz}
              className='px-4 py-2'
            >
              <Image
                src='/icon_btn_checking.svg'
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
            className={'text-2xl font-medium'}
          >
            결과 보기
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckingQuizPage;
