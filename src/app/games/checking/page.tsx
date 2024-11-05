'use client';
import browserClient from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
import QuizTimer from './_components/QuizTimer';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import './style.css';
import Image from 'next/image';

interface Qusetion {
  id: string;
  game_kind: string;
  question: string;
  answer: string;
  correct: string[];
}

const CheckingQuizPage = () => {
  const [questions, setQuestions] = useState<Qusetion[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [isAllQuestions, setIsAllQuestions] = useState(false);
  const router = useRouter();

  //유저 정보 가져오기
  const fetchUser = async () => {
    const {
      data: { user },
      error,
    } = await browserClient.auth.getUser();

    if (error) {
      console.log('비로그인');
    } else if (user) {
      setUserId(user.id);
    }
  };

  // 데이터 가져오기
  const fetchCheckingQuestions = async () => {
    setLoading(true);
    const { data, error } = await browserClient.rpc('get_checking_questions');
    if (error) {
      console.error('틀린 것 찾기 데이터를 가져오지 못했습니다', error);
    } else {
      setQuestions(data);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchCheckingQuestions();
    fetchUser();
  }, []);

  // 다음 문제로 넘어가기, 퀴즈 클리어
  const moveToNextQuiz = () => {
    if (currentQuizIndex < questions.length - 1) {
      setCurrentQuizIndex((index) => index + 1);
      handleCheckAnswer();
      setSelectedOption(null);
    } else {
      saveScore();
      setIsAllQuestions(true);
    }
  };

  const moveToWritingResultPage = () => {
    if (userId) {
      router.push(`/games/user?key=checking&score=${score}`);
    } else {
      router.push('/games/guest?key=checking');
    }
  };

  // 클릭 옵션 생성
  const chackingButton = () => {
    const correct = questions[currentQuizIndex].correct;
    return (
      <div className='flex flex-wrap gap-x-8 gap-y-[1.8125rem] justify-center max-w-[39.5rem] mx-auto'>
        {correct.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => setSelectedOption(option)}
            className={`w-[18.75rem] h-[6.25rem] text-[2.5rem] font-medium rounded-[1.25rem] ${
              selectedOption === option ? 'bg-[#A07BE5] text-white' : 'bg-white'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    );
  };

  // 정답 확인
  const handleCheckAnswer = () => {
    if (selectedOption === questions[currentQuizIndex].answer) {
      setScore((prevscore) => prevscore + 10);
    }
  };

  // 점수 저장
  const saveScore = async () => {
    const startSeason = new Date(2024, 9, 27);
    const now = new Date();
    const weekNumber = Math.floor((now.getTime() - startSeason.getTime()) / 604800000) + 1;

    if (userId) {
      // 특정 사용자에 대한 랭크 데이터 존재 여부 확인
      const { data: currentScore, error: fetchError } = await browserClient
        .from('rank')
        .select('id, checking')
        .eq('user_id', userId)
        .eq('week', weekNumber);
      if (fetchError) {
        console.error('기존 랭크 데이터를 가져오는 중 오류가 발생했습니다.', fetchError);
        return;
      }
      if (currentScore.length > 0) {
        if (score > currentScore[0].checking || currentScore[0].checking === null) {
          // 기존 점수가 현재 점수보다 낮을 경우 업데이트
          const { error: updateError } = await browserClient
            .from('rank')
            .update({
              checking: score,
            })
            .eq('id', currentScore[0].id);

          if (updateError) {
            console.error('점수를 업데이트하지 못했습니다.', updateError);
          }
        }
      } else {
        // 기존 데이터가 없으면 새로 삽입
        const { error: insertError } = await browserClient.from('rank').insert({
          user_id: userId,
          checking: score,
          week: weekNumber,
        });

        if (insertError) {
          console.error('점수를 삽입하지 못했습니다.', insertError);
        }
      }
    } else {
      // 비로그인 시 로컬 스토리지에 점수 저장
      localStorage.setItem('checking', score.toString());
    }
  };

  // 시간 초과
  const handleTimeOver = () => {
    if (!isTimeOver) {
      saveScore();
      setIsTimeOver(true);
      Swal.fire({
        html: '<p class="swal-custom-text">시간이 다 됐다 깨비!</p><p class="swal-custom-text">다음에 다시 도전하라 깨비</p>',
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text',
          confirmButton: 'swal-custom-button',
        },
        confirmButtonText: '확인',
      });
    }
  };

  const questionUnderLine = () => {
    const { question, correct } = questions[currentQuizIndex];
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    correct.forEach((phrase, index) => {
      const phraseIndex = question.indexOf(phrase, lastIndex);

      if (phraseIndex !== -1) {
        // phrase 전의 일반 텍스트 추가
        if (lastIndex < phraseIndex) {
          parts.push(<span key={lastIndex}>{question.slice(lastIndex, phraseIndex)}</span>);
        }

        // phrase에 밑줄과 번호 추가
        parts.push(
          <span
            key={phraseIndex}
            className=' underline decoration-[#357EE7] relative'
          >
            {phrase}
            <span className='absolute -bottom-7 left-1/2 transform -translate-x-1/2 flex w-[1.625rem] h-[1.625rem] bg-[#357EE7] text-[1.3125rem] text-white items-center justify-center rounded-full'>
              {index + 1}
            </span>
          </span>,
        );

        lastIndex = phraseIndex + phrase.length;
      }
    });

    // 마지막 남은 텍스트 추가
    if (lastIndex < question.length) {
      parts.push(<span key='end'>{question.slice(lastIndex)}</span>);
    }

    return <p>{parts}</p>;
  };

  if (loading) {
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
        <p className=' mt-[3.25rem] mb-20 text-2xl font-medium'>문장에서 틀린 부분을 고르세요</p>
        <div className=' text-4xl font-medium pb-[10.1875rem]'>{questionUnderLine()}</div>
        {chackingButton()}
      </div>
      <div className=' absolute top-1/2 right-[1.25rem] transform -translate-y-1/2 flex flex-col items-center'>
        {!isTimeOver && !isAllQuestions && (
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
        )}
        {(isTimeOver || isAllQuestions) && (
          <button
            onClick={moveToWritingResultPage}
            className='text-2xl font-medium'
          >
            결과 보기
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckingQuizPage;
