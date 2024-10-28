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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
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
      alert('모든 문제를 풀엇다!');
      moveToWritingResultPage();
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
    return correct.map((option: string, index: number) => {
      return (
        <button
          key={index}
          onClick={() => setSelectedOption(option)}
          className={`p-2 border border-black ${selectedOption === option ? 'bg-blue-300' : 'bg-gray-500'}`}
        >
          {option}
        </button>
      );
    });
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
    } else localStorage.setItem('checking_score', score.toString());
  };

  // 시간 초과 시 페이지 이동
  const handleTimeOver = () => {
    saveScore();
    alert('시간 끝~');
    moveToWritingResultPage();
  };

  const questionUnderLine = () => {
    const { question, correct } = questions[currentQuizIndex];

    return (
      <p>
        {question.split(' ').map((word, index) => {
          // `correct` 배열에 포함된 단어나 구절인지 확인
          const isCorrect = correct.some((phrase) => phrase === word);

          return (
            <span
              key={index}
              className={isCorrect ? `underline ${selectedOption === word ? 'text-red-600' : 'text-black'}` : ''}
            >
              {word}
              {/* 구절이 `correct`에 있으면 번호 추가 */}
              {isCorrect && (
                <sub className={selectedOption === word ? 'text-red-600' : 'text-gray-500'}>
                  {correct.indexOf(word) + 1}
                </sub>
              )}
            </span>
          );
        })}
      </p>
    );
  };

  if (loading) {
    return <p>로딩중</p>;
  }

  return (
    <div>
      <Timer onTimeOver={handleTimeOver} />
      <p>{`${currentQuizIndex + 1}번 문제`}</p>
      <p>문장에서 틀린 부분을 고르세요</p>
      <div>
        <div>
          <p>{questionUnderLine()}</p>
        </div>
        <div>{chackingButton()}</div>
        <button onClick={handleCheckAnswer}>다음 문제로</button>
      </div>
    </div>
  );
};

export default CheckingQuizPage;
