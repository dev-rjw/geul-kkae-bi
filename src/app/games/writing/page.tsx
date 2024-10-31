'use client';
import browserClient from '@/util/supabase/client';
import React, { useEffect, useState } from 'react';
import Timer from './_components/Timer';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import ConsonantCard from './_components/ConsonantCard';

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
      handleCheckAnswer();
      setUserInput('');
    } else {
      saveScore();
      setIsAllQuestions(true);
    }
  };
  // result페이지 이동
  const moveToWritingResultPage = () => {
    if (userId) {
      router.push(`/games/user?key=writing&score=${score}`);
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
  // 점수 저장 -  로그인 상태는 수퍼베이스에 저장, 비로그인 시 로컬 스토리지에 저장
  const saveScore = async () => {
    const startSeason = new Date(2024, 9, 27);
    const now = new Date();
    const weekNumber = Math.floor((now.getTime() - startSeason.getTime()) / 604800000) + 1;

    if (userId) {
      // 특정 사용자에 대한 랭크 데이터 존재 여부 확인
      const { data: currentScore, error: fetchError } = await browserClient
        .from('rank')
        .select('id, writing')
        .eq('user_id', userId)
        .eq('week', weekNumber);
      if (fetchError) {
        console.error('기존 랭크 데이터를 가져오는 중 오류가 발생했습니다.', fetchError);
        return;
      }
      if (currentScore && currentScore.length > 0) {
        if (score > currentScore[0].writing) {
          // 기존 점수가 현재 점수보다 낮을 경우 업데이트
          const { error: updateError } = await browserClient
            .from('rank')
            .update({
              writing: score,
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
          writing: score,
          week: weekNumber,
        });

        if (insertError) {
          console.error('점수를 삽입하지 못했습니다.', insertError);
        }
      }
    } else {
      // 비로그인 시 로컬 스토리지에 점수 저장
      localStorage.setItem('writing', score.toString());
    }
  };

  // 시간 초과 시 페이지 이동
  const handleTimeOver = () => {
    saveScore();
    Swal.fire({
      title: '시간 초과쥬?',
      text: '결과 페이지로 넘어가쥬?',
      willClose: () => {
        moveToWritingResultPage();
      },
    });
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
      <div className='flex-1 flex flex-col items-center justify-center p-20'>
        <p className=' border bg-writing-500 rounded-full px-4 py-2 text-[20px] font-bold'>{`${
          currentQuizIndex + 1
        }번문제`}</p>
        <p className=' py-12 text-[40px] font-bold'>해당 자음을 보고 제시한 문장에 어울리는 단어를 적어주세요.</p>
        <ConsonantCard consonants={question.consonant} />
        <p className='pt-14 text-[40px] font-bold'>{question.question}</p>
        <p className='pt-5 text-[28px] font-bold text-writing-500'>{`**${question.meaning}`}</p>
        <input
          type='text'
          placeholder='정답을 입력하세요'
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className=' pt-20 border-b border-black focus:outline-none text-[20px]'
        />
      </div>

      <div className='absolute right-4 top-1/4 flex flex-col items-end'>
        <p className='self-center'>{`${currentQuizIndex + 1}/10`}</p>
        <button
          onClick={moveToNextQuiz}
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
