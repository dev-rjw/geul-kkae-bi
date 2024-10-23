'use client';
import browserClient from '@/util/supabase/client';
import React, { useEffect, useState } from 'react';

interface Qusetion {
  id: string;
  game_kind: string;
  question: string;
  answer: string;
  consonant: string;
}

const WritingQuizPage = () => {
  const [questions, setQuestions] = useState<Qusetion[]>([]);
  const [userInput, setUserInput] = useState('');
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const correct = userInput === questions[0].answer;
    alert(correct ? '정답입니다!' : '오답입니다!');
  };

  console.log(questions);
  return (
    <div>
      <h1>해당 자음을 보고 제시한 문장에 어울리는 단어를 적어주세요.</h1>
      <div>
        <p>{questions[0].consonant}</p>
        <p>{questions[0].question}</p>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          <button>제출</button>
        </form>
      </div>
    </div>
  );
};

export default WritingQuizPage;
