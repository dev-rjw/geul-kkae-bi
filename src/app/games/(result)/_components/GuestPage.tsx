'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GamesArray, GamesScore, JustEndedGameProp } from '@/types/result';
import ResultSide from '../_components/ResultSide';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { highlightScoreForMatchedGame } from '../utils/highlightScoreForMatchedGame';
import Modal from './Modal';

const GuestPage = ({ searchParams }: JustEndedGameProp) => {
  const [games, setGames] = useState<GamesArray[]>();

  useEffect(() => {
    const speakingScore = localStorage.getItem('speaking');
    const checkingScore = localStorage.getItem('checking');
    const writingScore = localStorage.getItem('writing');

    const convertScoreToGamesArray = ({ speakingScore, checkingScore, writingScore }: GamesScore) => {
      return [
        {
          type: 'checking',
          score: checkingScore,
          color: 'bg-tertiary-p-100',
          name: '틀린 말 탐정단',
        },
        {
          type: 'speaking',
          score: speakingScore,
          color: 'bg-secondary-100',
          name: '나야, 발음왕',
        },
        { type: 'writing', score: writingScore, color: 'bg-tertiary-g-100', name: '빈칸 한입' },
      ];
    };

    setGames(convertScoreToGamesArray({ speakingScore, checkingScore, writingScore }));
  }, []);

  useEffect(() => {
    const notFinishedGames = games?.filter((game) => game.score === null);
    if (notFinishedGames?.length === 3) {
      redirect('/');
    }
  }, [games]);

  const justEndedGame: string | undefined = searchParams.key;

  const GameScore: string | undefined = searchParams.score;

  const matchedGame = games?.find((game) => game.type === justEndedGame);
  const unMatchedGames = games?.filter((game) => game.type !== justEndedGame);

  return (
    <div>
      <div className='flex justify-center pt-7 pb-[1.875rem] '>
        <div className='title-32 inline relative'>
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
              <span className='title-20 text-primary-500'>당신은</span>
              <span className='query body-16'>님의</span>
              <div className='query title-32'>국어 문해력은?</div>
            </div>
            <div className={`${matchedGame?.type} title-72 h-[6.813rem] pt-[1.219rem] inline relative`}>
              <span className='score relative z-20'>{GameScore}점</span>
              <div
                className={`h-[2.688rem] ${
                  matchedGame ? highlightScoreForMatchedGame(matchedGame) : ''
                } absolute w-full -bottom-5 z-10`}
              />
            </div>
            <Modal />
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
      <div className='flex justify-center items-center h-[138px]'>
        <div className='flex items-center gap-[221.04px]'>
          <div>
            <div className='body-22 text-gray-500'>종합 랭킹을 확인하려면</div>
            <div className='body-30 text-gray-700'>
              꼬옥 <span className='text-warning-300'>로그인</span> 후 게임을 모두 플레이해 깨비!
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
