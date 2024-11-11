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

const WritingQuizPage = () => {
  const { data: user } = useAuth();
  const userId = user?.id ?? null;
  const { data: questions = [], isLoading } = useFetchQuestions();
  const [userInput, setUserInput] = useState('');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const scoreRef = useRef(0);
  const [isAllQuestions, setIsAllQuestions] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const question = questions[currentQuizIndex];
  const router = useRouter();
  const insertScoreMutation = useInsertWritingMutation();
  const updateScoreMutation = useUpdateWritingMutation();

  // 다음 문제로 넘어가기, 퀴즈 클리어
  const moveToNextQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    setUserInput('');
    if (isTimeOver || isAllQuestions) return;

    handleCheckAnswer();
    if (currentQuizIndex < questions.length - 1) {
      setCurrentQuizIndex((index) => index + 1);
    } else {
      saveScore(scoreRef.current);
      moveToWritingResultPage(scoreRef.current);
      setIsAllQuestions(true);
    }
  };
  // result페이지 이동
  const moveToWritingResultPage = (score: number) => {
    if (userId) {
      router.push(`/games/user?key=writing&score=${score}`);
    } else {
      router.push(`/games/guest?key=writing&score=${score}`);
    }
  };

  // 정답 확인, 점수 추가
  const handleCheckAnswer = () => {
    if (userInput === question.answer) {
      scoreRef.current += 10;
    }
  };

  // 점수 저장 - 로그인 상태는 Supabase에 저장, 비로그인 시 로컬 스토리지에 저장
  const saveScore = async (score: number) => {
    const startSeason = new Date(2024, 9, 27);
    const now = new Date();
    const weekNumber = Math.floor((now.getTime() - startSeason.getTime()) / 604800000) + 1;

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
        insertScoreMutation.mutate({ score, userId, weekNumber });
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
        html: '<p class="swal-custom-text">시간이 다 됐다 깨비!</p><p class="swal-custom-text">다음에 다시 도전하라 깨비</p>',
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
        <p className='inline-flex items-center justify-center px-[1.875rem] py-2.5 bg-[#2AD4AF] text-2xl font-medium rounded-full font-Pretendard'>{`${
          currentQuizIndex + 1
        }번문제`}</p>
        <p className='mt-[4.25rem] mb-10 text-4xl font-medium font-yangjin'>
          해당 자음을 보고 제시한 문장에 어울리는 단어를 적어주세요.
        </p>
        <ConsonantCard consonants={question.consonant} />
        <div className='flex flex-col justify-center items-center h-[12.5rem] mt-10 p-2.5 font-yangjin'>
          <p className='text-4xl font-medium mb-[1.6875rem]'>{question.question}</p>
          <p className='text-2xl font-medium text-[#2AD4AF]'>{`**${question.meaning}`}</p>
        </div>
        <form onSubmit={moveToNextQuiz}>
          <input
            type='text'
            placeholder='정답을 입력하고 엔터를 치세요'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
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
