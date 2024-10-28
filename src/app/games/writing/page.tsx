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
  consonant: string;
  meaning: string;
}

const WritingQuizPage = () => {
  const [questions, setQuestions] = useState<Qusetion[]>([]);
  const [userInput, setUserInput] = useState('');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAllQuestions, setIsAllQuestions] = useState(false);
  const router = useRouter();

  // 유저 정보 가져오기
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

  // 퀴즈 가져오기
  const fetchWritingQuestions = async () => {
    setLoading(true);
    const { data, error } = await browserClient.rpc('get_writing_questions');

    if (error) {
      console.error('문제 데이터를 가져오지 못했습니다', error);
    } else {
      setQuestions(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
    fetchWritingQuestions();
  }, []);

  // 다음 문제로 넘어가기, 퀴즈 클리어
  const moveToNextQuiz = () => {
    if (currentQuizIndex < questions.length - 1) {
      setCurrentQuizIndex((index) => index + 1);
      setUserInput('');
    } else {
      saveScore();
      setIsAllQuestions(true);
    }
  };
  // result페이지 이동
  const moveToWritingResultPage = () => {
    if (userId) {
      router.push('/games/user?key=writing');
    } else {
      router.push('/games/guest?key=writing');
    }
  };

  //정답 확인, 점수 추가
  const handleCheckAnswer = () => {
    const correct = userInput === questions[currentQuizIndex].answer;
    if (correct) {
      setScore((prevScore) => prevScore + 10);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCheckAnswer();
    moveToNextQuiz();
  };

  // 점수 저장 -  로그인 상태는 수퍼베이스에 저장, 비로그인 시 로컬 스토리지에 저장
  const saveScore = async () => {
    if (userId) {
      const { error } = await browserClient.from('rank').upsert({
        user_id: userId,
        writing: score,
        created_at: new Date(),
      });
      if (error) {
        console.error('점수를 저장하지 못했습니다.', error);
      }
    } else {
      localStorage.setItem('writing', score.toString());
    }
  };

  // 시간 초과 시 페이지 이동
  const handleTimeOver = () => {
    saveScore();
    alert('시간 끝~ 결과 페이지로 이동!');
    moveToWritingResultPage();
  };

  if (loading) {
    return <p>로딩중</p>;
  }

  return (
    <div>
      <Timer onTimeOver={handleTimeOver} />
      <p>{`${currentQuizIndex + 1}번 문제`}</p>
      <p>해당 자음을 보고 제시한 문장에 어울리는 단어를 적어주세요.</p>
      <div>
        <div>
          <p>{questions[currentQuizIndex].consonant}</p>
          <p>{questions[currentQuizIndex].question}</p>
          <p>{`**${questions[currentQuizIndex].meaning}`}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          <button type='submit'>다음 문제 </button>
          {isAllQuestions && <button onClick={moveToWritingResultPage}>결과 보기</button>}
        </form>
      </div>
    </div>
  );
};

export default WritingQuizPage;
