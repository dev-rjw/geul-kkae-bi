'use client';
import browserClient from '@/util/supabase/client';
import React, { useEffect, useState } from 'react';
import Timer from './components/Timer';
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
      router.push('/games/user?type=checking');
    } else {
      router.push('/games/guest?type=checking');
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
    if (userId) {
      const { error } = await browserClient
        .from('rank')
        .upsert({ user_id: userId, checking: score, create_at: new Date() });
      if (error) {
        console.error('점수를 저장하지 못했습니다.', error);
      }
    } else localStorage.setItem('checking', score.toString());
  };

  // 시간 초과 시 페이지 이동
  const handleTimeOver = () => {
    saveScore();
    Swal.fire({
      title: '시간 초과!',
      text: '결과 페이지로 넘어갑니다.',
      willClose: () => {
        moveToWritingResultPage();
      },
    });
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
      <Timer
        onTimeOver={handleTimeOver}
        isAllQuestions={isAllQuestions}
      />
      <div className='flex-1 flex flex-col items-center justify-center'>
        <p>{`${currentQuizIndex + 1}번 문제`}</p>
        <p>문장에서 틀린 부분을 고르세요</p>
        <div className='p-4'>{questionUnderLine()}</div>
        {chackingButton()}
      </div>
      <div className=' absolute right-4 top-1/4 flex flex-col items-end'>
        <button onClick={handleCheckAnswer}>다음 문제로</button>
        {isAllQuestions && <button onClick={moveToWritingResultPage}>결과 보기</button>}
      </div>
    </div>
  );
};

export default CheckingQuizPage;
