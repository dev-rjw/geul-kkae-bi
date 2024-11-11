'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GamesArray, GamesScore, JustEndedGameProp, matchedGameArrayForGuest } from '@/types/result';
import ResultSide from '../_components/ResultSide';
import '../style.css';
import { redirect } from 'next/navigation';
import Image from 'next/image';

const GuestPage = ({ searchParams }: JustEndedGameProp) => {
  const [games, setGames] = useState<GamesArray[]>();

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
          color: 'bg-[#Ddd0f6]',
          name: '틀린 말 탐정단',
        },
        {
          type: 'speaking',
          score: speakingScore,
          color: 'bg-[#FEEFD7]',
          name: '나야, 발음왕',
        },
        { type: 'writing', score: writingScore, color: 'bg-[#D4F7EF]', name: '빈칸 한입' },
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

  const game = (matchedGame: matchedGameArrayForGuest) => {
    switch (true) {
      case matchedGame.type === 'speaking':
        return 'bg-[#Fbd498]';
      case matchedGame.type === 'checking':
        return 'bg-[#BFA5ED]';
      case matchedGame.type === 'writing':
        return 'bg-[#7FE6CF]';
      default:
        return '';
    }
  };
  return (
    <div>
      <div className='flex justify-center pt-7 pb-[1.875rem] '>
        <div className='title-32 inline  relative'>
          {matchedGame?.name} 결과 <div className={`h-5 ${matchedGame?.color} absolute w-full -bottom-1 -z-10`} />
        </div>
      </div>

      <div className='flex flex-row justify-center h-[36.5rem]'>
        <div className={`flex w-[49.5rem] rounded-[1.25rem] ${matchedGame?.color} `}>
          <ResultSide
            GameScore={GameScore}
            justEndedGame={justEndedGame}
          />
          <div className='flex flex-col items-center text-center pl-[2.929rem] pt-[7.5rem] '>
            <div className={`${matchedGame?.type} `}>
              <span className='title-20 text-[#1965D2]'>당신은</span>
              <span className='query body-16 '>님의</span>
              <div className='query title-32'>국어 문해력은?</div>
            </div>
            <div className={`${matchedGame?.type} title-72 h-[6.813rem] pt-[1.219rem] inline  relative`}>
              <span className='score relative z-20'>{GameScore}점</span>
              <div className={`h-[2.688rem] ${matchedGame ? game(matchedGame) : ''} absolute w-full -bottom-5 z-10`} />
            </div>
          </div>
        </div>
        <div className='flex flex-col pl-2.5 justify-between w-[17.438rem]'>
          {unMatchedGames?.map((game) => {
            return (
              <Link
                key={game.type}
                href={`/games/${game.type}`}
              >
                <div className={`${game.color} h-[17.938rem] rounded-[1.25rem] game ${game.type} `}>
                  {game.score === null ? (
                    <div className='pt-[21.79px] pl-[23.89px]'>
                      <div className='title-32'>{game.name}</div>
                      <div className='title-24'>하러가기</div>
                    </div>
                  ) : (
                    <div className='pt-[21.79px] pl-[23.89px] '>
                      <div className='title-32'>{game.name}</div>
                      <div className='flex title-24 gap-1'>
                        <p>현재 스코어:</p>
                        <div>{game.score}점</div>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className='flex justify-center items-center  h-[138px]'>
        <div className='flex items-center gap-[221.04px]'>
          <div>
            <div className='body-22 text-[#838281]'>종합 랭킹을 확인하려면</div>
            <div className='body-30 text-[#504F4E]'>
              꼬옥 <span className='text-[#EF5252]'>로그인</span> 후 게임을 모두 플레이해 깨비!
            </div>
          </div>
          <Image
            width={230}
            height={93.2}
            src={`/icon_guide_to_play_for_guest.svg`}
            alt='비회원 게임플레이 안내 아이콘'
          />
        </div>
      </div>
    </div>
  );
};

export default GuestPage;

{
  /* <div>
<div className='flex justify-center pt-7 pb-[1.875rem] '>
  <div className='title-32 inline  relative'>
    {matchedGame?.name} 결과 <div className={`h-5 ${matchedGame?.color} absolute w-full -bottom-1 -z-10`} />
  </div>
</div>

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
</div> */
}
