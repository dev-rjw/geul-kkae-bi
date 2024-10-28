'use client';

import React, { useEffect, useState } from 'react';
import { JustEndedGameProp } from '../user/page';

export interface GamesScore {
  speakingScore: string | null;
  checkingScore: string | null;
  writingScore: string | null;
}

export interface GamesArray {
  type: string;
  score: string | null;
  color: string;
  name: string;
}

const ResultPageForGuest = ({ searchParams }: JustEndedGameProp) => {
  const [games, setGames] = useState<GamesArray[]>();

  //얘는 더미데이터
  if (typeof window !== 'undefined') {
    localStorage.setItem('speaking', '80');
    localStorage.setItem('checking', '70');
    localStorage.setItem('writing', '60');
  }

  useEffect(() => {
    //로컬스토리지에서 해당 value 가져오기(첫렌더링 할때마다)
    //스트링 들어오면 내보내고 널이면 안내보내고 처리
    const speakingScore = localStorage.getItem('speaking');
    console.log('speakingScore', speakingScore);
    const checkingScore = localStorage.getItem('checking');
    console.log('checkingScore', checkingScore);
    const writingScore = localStorage.getItem('writing');
    console.log('writingScore', writingScore);

    const gamesArray = ({ speakingScore, checkingScore, writingScore }: GamesScore) => {
      return [
        {
          type: 'checking',
          score: checkingScore,
          color: 'bg-purple-300',
          name: '틀린곳맞추기',
        },
        {
          type: 'speaking',
          score: speakingScore,
          color: 'bg-orange-200',
          name: '주어진문장읽기',
        },
        { type: 'writing', score: writingScore, color: 'bg-teal-100', name: '빈칸채우기' },
      ];
    };

    setGames(gamesArray({ speakingScore, checkingScore, writingScore }));
  }, []);

  const justEndedGame: string | undefined = searchParams.key;

  return (
    <div className='flex flex-row'>
      {games?.map((game) => {
        if (game.type === justEndedGame) {
          return (
            <div
              key={game.type}
              className={`w-96 h-96 ${game.color}`}
            >
              <div>닉네임님의 국어 문해력은</div>
              <div>{game.score}</div>
              <div>캐릭터</div>
              <div>한줄코멘트</div>
            </div>
          );
        } else {
          return (
            <div key={game.type}>
              <div className={`w-52 h-52 border-black border-4 flex flex-col ${game.color}`}>
                <div>
                  {game.score ? (
                    <div>
                      {game.name} {game.score}
                    </div>
                  ) : (
                    `${game.name}하러가기`
                  )}
                </div>
              </div>
            </div>
          );
        }
      })}
      <div>종합 랭킹을 확인하려면 로그인을 해야해깨비</div>
      <div>
        게임즈에 들어가서 게임 점수가 3개 이상이면 이문구 -그리고 나머지 게임도 플레이 해봐 깨비-없애고 이하면 유지{' '}
      </div>
    </div>
  );
};

export default ResultPageForGuest;

// 로컬 스토리지에서 key가 있으면 점수표시하고 없으면 해당 게임하러가기 문구표시
// 방금 끝난게임과 끝나지 않은 게임 구분 (파람으로 받아줘야함)
//그걸로 바로 화면 그려주면 됨
