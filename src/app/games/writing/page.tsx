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
  const question = questions[currentQuizIndex];
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
    const correct = userInput === question.answer;
    if (correct) {
      setScore((prevScore) => prevScore + 10);
    }
  };

  const handleNextQuestion = () => {
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

  const ConsonantCards = (consonants: string) => {
    return (
      <div className='flex justify-center gap-3'>
        {consonants.split('').map((char, index) => {
          return (
            <div
              key={index}
              className='w-12 h-12 flex items-center justify-center bg-orange-200 text-lg font-bold'
            >
              {char}
            </div>
          );
        })}
      </div>
    );
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
        <div className='p-4'>
          <p className='text-center'>{`${currentQuizIndex + 1}번 문제`}</p>
          <p className='text-center'>해당 자음을 보고 제시한 문장에 어울리는 단어를 적어주세요.</p>
        </div>
        <div className='mb-4'>
          <p className='text-center'>{ConsonantCards(question.consonant)}</p>
          <p className='text-center'>{question.question}</p>
          <p className='text-center'>{`**${question.meaning}`}</p>
        </div>
        <div className='flex justify-center'>
          <input
            type='text'
            placeholder='정답을 입력하세요'
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>
      </div>

      <div className='absolute right-4 top-1/4 flex flex-col items-end'>
        <p className='self-center'>{`${currentQuizIndex + 1}/10`}</p>
        <button
          onClick={handleNextQuestion}
          className='px-4 py-2'
        >
          다음 문제
        </button>
        {isAllQuestions && (
          <button
            onClick={moveToWritingResultPage}
            className='px-4 py-2'
          >
            결과 보기
          </button>
        )}
      </div>
    </div>
  );
};

export default WritingQuizPage;
