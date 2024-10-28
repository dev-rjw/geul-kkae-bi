'use client';

import React, { useEffect, useState } from 'react';
import { JustEndedGameProp } from '../user/page';
import Link from 'next/link';

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

  //서치파람으로 가져온 방금 끝난 게임 이름
  const justEndedGame: string | undefined = searchParams.key;

  //사용자가 방금 끝낸 게임
  const matchedGame = games?.find((game) => {
    return game.type === justEndedGame;
  });

  //사용자가 방금 끝내지 않은 게임
  const unMatchedGames = games?.filter((game) => {
    return game.type !== justEndedGame;
  });

  // isdone= true : 모든문제 끝냄  isdone= false : 1문제만 끝냄, 2문제 모두 못끝냄
  const isDone = unMatchedGames?.every((game) => game.score);

  const playMessage = isDone
    ? `종합 랭킹을 확인하려면 로그인을 해야해 깨비!`
    : `종합 랭킹을 확인하려면 로그인을 해야해 깨비! 그리고 나머지 게임도 플레이 해봐 깨비!`;

  // 해야될것
  // 점수에 따라서 라운드 그래프 변경, 캐릭터 변경, 점수평변경

  return (
    <div>
      <div className='w-[590] flex justify-between'>
        <div>{matchedGame?.name}</div>
        <Link href={'/'}>홈으로</Link>
      </div>
      <div className='flex flex-row'>
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
      <div>{playMessage}</div>
    </div>
  );
};

export default ResultPageForGuest;

// 로컬 스토리지에서 key가 있으면 점수표시하고 없으면 해당 게임하러가기 문구표시
// 방금 끝난게임과 끝나지 않은 게임 구분 (파람으로 받아줘야함)
//그걸로 바로 화면 그려주면 됨
//플레이된 게임에 따라 문구

// {games?.map((game) => {
//   if (game.type === justEndedGame) {
//     return (
//       <div
//         key={game.type}
//         className={`w-96 h-96 ${game.color}`}
//       >
//         <div>닉네임님의 국어 문해력은</div>
//         <div>{game.score}</div>
//         <div>캐릭터</div>
//         <div>한줄코멘트</div>
//       </div>
//     );
//   } else {
//     return (
//       <div key={game.type}>
//         <div className={`w-52 h-52 border-black border-4 flex flex-col ${game.color}`}>
//           <div>
//             {game.score ? (
//               <div>
//                 {game.name} {game.score}
//               </div>
//             ) : (
//               `${game.name}하러가기`
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }
// })}
