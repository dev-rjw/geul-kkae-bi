'use client';
import browserClient from '@/util/supabase/client';
import React, { useEffect, useState } from 'react';
import Timer from './components/Timer';

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
  const [currentQuizNumber, setCurrentQuiz] = useState(0);
  const [loading, setLoading] = useState(true);

  // 데이터 가져오기 랜덤으로
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
    fetchWritingQuestions();
  }, []);

  // 다음 문제로 넘어가기, 퀴즈 클리어
  const moveToNextQuestion = () => {
    if (currentQuizNumber < questions.length - 1) {
      setCurrentQuiz((index) => index + 1);
      setUserInput('');
    } else {
      alert('모든 문제를 풀엇다!');
    }
  };

  //정답 확인
  const handleChackAnswers = () => {
    const correct = userInput === questions[currentQuizNumber].answer;
    console.log(correct);
    // 정답 여부에 따른 점수 로직 필요
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleChackAnswers();
    moveToNextQuestion();
  };

  // 시간 초과
  const handleTimeOver = () => {
    alert('시간 끝~');
    // 시간 초과하면 보여줄 페이지 로직 필요
  };

  if (loading) {
    return <p>로딩중</p>;
  }

  return (
    <div>
      <Timer onTimeOver={handleTimeOver} />
      <p>{`${currentQuizNumber + 1}번 문제`}</p>
      <p>해당 자음을 보고 제시한 문장에 어울리는 단어를 적어주세요.</p>
      <div>
        <div>
          <p>{questions[currentQuizNumber].consonant}</p>
          <p>{questions[currentQuizNumber].question}</p>
          <p>{`※ ${questions[currentQuizNumber].meaning}`}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          <button type='submit'>제출</button>
        </form>
      </div>
    </div>
  );
};

export default WritingQuizPage;
