'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GamesArray, GamesScore, JustEndedGameProp } from '@/types/result';
import ResultSide from '../_components/ResultSide';
import '../style.css';
import { redirect } from 'next/navigation';

const GuestPage = ({ searchParams }: JustEndedGameProp) => {
  const [games, setGames] = useState<GamesArray[]>();

  //얘는 더미데이터
  if (typeof window !== 'undefined') {
    localStorage.setItem('speaking', '80');
    localStorage.setItem('checking', '100');
    // localStorage.setItem('writing', '60');
  }

  useEffect(() => {
    //로컬스토리지에서 해당 value 가져오기(첫렌더링 할 때마다)
    const speakingScore = localStorage.getItem('speaking');
    const checkingScore = localStorage.getItem('checking');
    const writingScore = localStorage.getItem('writing');

    //가져온 value들을 이용해 새로게 만들어준 객체배열을 만들어주는 gamesArray 함수
    const gamesArray = ({ speakingScore, checkingScore, writingScore }: GamesScore) => {
      return [
        {
          type: 'checking',
          score: checkingScore,
          color: 'bg-purple-300',
          name: '틀린 곳 맞추기',
        },
        {
          type: 'speaking',
          score: speakingScore,
          color: 'bg-orange-200',
          name: '주어진 문장 읽기',
        },
        { type: 'writing', score: writingScore, color: 'bg-teal-100', name: '빈칸 채우기' },
      ];
    };

    // games에 gamesArray로인해 만들어진 배열을 넣어줌
    setGames(gamesArray({ speakingScore, checkingScore, writingScore }));
  }, []);

  //게임을 안하고 결과페이지 접근하려면 돌려보냄= protected route
  useEffect(() => {
    const notFinishedGames = games?.filter((game) => game.score === null);
    if (notFinishedGames?.length === 3) {
      redirect('/');
    }
  }, [games]);

  //서치파람으로 가져온 방금 끝난 게임 이름
  const justEndedGame: string | undefined = searchParams.key;

  // 방금 끝난 게임 점수
  const GameScore: string | undefined = searchParams.score;

  //사용자가 방금 끝낸 게임
  const matchedGame = games?.find((game) => {
    return game.type === justEndedGame;
  });

  //사용자가 방금 끝내지 않은 게임
  const unMatchedGames = games?.filter((game) => {
    return game.type !== justEndedGame;
  });

  return (
    <div>
      <div>{matchedGame?.name}</div>

      <div className='flex flex-row'>
        <ResultSide
          GameScore={GameScore}
          justEndedGame={justEndedGame}
        />
        <div className={`w-96 h-[415] ${matchedGame?.color}`}>
          <div>당신의 국어문해력은</div>
          <div>{matchedGame?.score}</div>
          <div>캐릭터</div>
          <div>점수코멘트</div>
        </div>
        <div>
          {unMatchedGames?.map((game) => {
            return (
              <Link
                key={game.type}
                href={`/games/${game.type}`}
              >
                <div className={`felx flex-col w-52 h-52 ${game.color}`}>
                  {game.score ? (
                    <div>
                      <div>
                        {game.name} {game.score}
                      </div>
                      <div>아이콘</div>
                    </div>
                  ) : (
                    <div>
                      <div>{game.name} 하러가기</div>
                      <div>아이콘</div>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div>
        <div>종합 랭킹을 확인하려면</div>
        <div>
          꼬옥 <span className='text-orange-200'>로그인</span> 후 게임을 모두 플레이 해야해 깨비!
        </div>
      </div>
    </div>
  );
};

export default GuestPage;
