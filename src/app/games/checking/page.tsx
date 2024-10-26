'use client';
import browserClient from '@/util/supabase/client';
import React, { useEffect, useState } from 'react';
import Timer from './components/Timer';
import { useRouter } from 'next/navigation';

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
    } else {
      saveScore();
      alert('모든 문제를 풀엇다!');
      moveToWritingResultPage();
    }
  };

  const moveToWritingResultPage = () => {
    router.push('/games/result?type=checking');
  };

  // 클릭 옵션 생성
  const chackingButton = () => {
    const correct = questions[currentQuizIndex].correct;
    return correct.map((option: string, index: number) => {
      return (
        <button
          key={index}
          onClick={() => handleClick(option)}
          className=' gap-4 border border-black'
        >
          {option}
        </button>
      );
    });
  };

  // 정답  확인
  const handleClick = (selectedOption: string) => {
    if (selectedOption === questions[currentQuizIndex].answer) {
      setScore((prevscore) => prevscore + 10);
      moveToNextQuiz();
    } else {
      moveToNextQuiz();
    }
  };

  const saveScore = async () => {
    if (userId) {
      const { error } = await browserClient
        .from('rank')
        .upsert({ user_id: userId, checking: score, create_at: new Date() });
      if (error) {
        console.error('점수를 저장하지 못했습니다.', error);
      }
    } else localStorage.setItem('checking_score', score.toString());
  };

  // 시간 초과 시 페이지 이동
  const handleTimeOver = () => {
    saveScore();
    alert('시간 끝~');
    moveToWritingResultPage();
  };

  if (loading) {
    return <p>로딩중</p>;
  }

  return (
    <div>
      <Timer onTimeOver={handleTimeOver} />
      <p>{`${currentQuizIndex + 1}번 문제`}</p>
      <p>문장에서 틀린부분을 고르세요</p>
      <div>
        <div>
          <p>{questions[currentQuizIndex].question}</p>
        </div>
        <div>{chackingButton()}</div>
      </div>
    </div>
  );
};

export default CheckingQuizPage;
