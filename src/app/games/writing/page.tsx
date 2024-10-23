'use client';
import browserClient from '@/util/supabase/client';
import React, { useEffect, useState } from 'react';

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

  const fetchWritingQuestins = async () => {
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
    fetchWritingQuestins();
  }, []);

  if (loading) {
    return <p>로딩중</p>;
  }

  const moveToNextQuestion = () => {
    if (currentQuizNumber < questions.length - 1) {
      setCurrentQuiz((index) => index + 1);
      setUserInput('');
    } else {
      alert('모든 문제를 풀엇다!');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const correct = userInput === questions[0].answer;
    alert(correct ? '정답입니다!' : '오답입니다!');
    moveToNextQuestion();
  };

  console.log(questions);
  return (
    <div>
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
