'use client';
import browserClient from '@/util/supabase/client';
import React, { useEffect, useState } from 'react';
import QuizTimer from './_components/QuizTimer';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

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
      <div className='grid grid-cols-2 gap-3'>
        {correct.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => setSelectedOption(option)}
            className={`p-2 border border-black ${selectedOption === option ? 'bg-blue-300' : 'bg-gray-500'}`}
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
      moveToNextQuiz();
    } else {
      moveToNextQuiz();
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
      if (currentScore && currentScore.length > 0) {
        if (score > currentScore[0].checking) {
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
        title: '<span style="color: #3b82f6; font-size: 24px; font-weight: bold;">시간이 다 됐다 깨비!</span>',
        html: '<span style="color: #3b82f6; font-size: 24px; font-weight: bold;">다음에 다시 도전하라 깨비</span>',
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
            className='underline decoration-black relative'
          >
            {phrase}
            <sub className='absolute -bottom-4 left-1/2 text-sm text-gray-500'>{index + 1}</sub>
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
      <div className='flex-1 flex flex-col items-center justify-center'>
        <p className='pt-20 font-size:1'>{`${currentQuizIndex + 1}번 문제`}</p>
        <p>문장에서 틀린 부분을 고르세요</p>
        <div className='p-4'>{questionUnderLine()}</div>
        {chackingButton()}
      </div>
      <div className=' absolute right-4 top-1/4 flex flex-col items-end'>
        {!isTimeOver && !isAllQuestions && (
          <div>
            <p className='self-center'>{`${currentQuizIndex + 1}/10`}</p>
            <button onClick={handleCheckAnswer}>다음 문제로</button>
          </div>
        )}
        {(isTimeOver || isAllQuestions) && <button onClick={moveToWritingResultPage}>결과 보기</button>}
      </div>
    </div>
  );
};

export default CheckingQuizPage;
