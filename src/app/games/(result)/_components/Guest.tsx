'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { GamesArray, GamesScore, JustEndedGameProp } from '@/types/result';
import LineTitle from '@/components/LineTitle';
import ResultCard from './ResultCard';
// import Modal from './Modal';

const Guest = ({ searchParams }: JustEndedGameProp) => {
  const [games, setGames] = useState<GamesArray[]>();

  useEffect(() => {
    const speakingScore = localStorage.getItem('speaking');
    const checkingScore = localStorage.getItem('checking');
    const writingScore = localStorage.getItem('writing');

    const convertScoreToGamesArray = ({ speakingScore, checkingScore, writingScore }: GamesScore) => {
      return [
        {
          type: 'speaking',
          score: speakingScore,
          name: '나야, 발음왕',
          backgroundColor: 'bg-[#FEEFD7] max-md:bg-[#FEEFD7]',
          titleColor1: 'text-secondary-700',
          titleColor2: 'text-secondary-600',
          lineColor: 'bg-secondary-200',
        },
        {
          type: 'checking',
          score: checkingScore,
          name: '틀린 말 탐정단',
          backgroundColor: 'bg-tertiary-p-100 max-md:bg-tertiary-p-100',
          titleColor1: 'text-tertiary-p-700',
          titleColor2: 'text-tertiary-p-400',
          lineColor: 'bg-tertiary-p-200',
        },
        {
          type: 'writing',
          score: writingScore,
          name: '빈칸 한입',
          backgroundColor: 'bg-tertiary-g-100 max-md:bg-tertiary-g-100',
          titleColor1: 'text-tertiary-g-800',
          titleColor2: 'text-tertiary-g-600',
          lineColor: 'bg-tertiary-g-200',
        },
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
      <div className='container py-8 max-md:p-0'>
        <div className='flex max-md:hidden justify-center pb-[2.375rem]'>
          <LineTitle
            className='text-primary-400 title-34 font-normal'
            lineClassName={`!-bottom-1.5 !w-[calc(100%+20px)] h-4/6 ${matchedGame?.lineColor}`}
          >
            <span className={matchedGame?.titleColor1}>
              {matchedGame?.name} <span className={matchedGame?.titleColor2}>결과</span>
            </span>
          </LineTitle>
        </div>

        <div
          className={`flex h-[36.5rem] gap-[0.625rem] bg-transparent max-lg:flex-col max-lg:h-auto max-md:gap-0 ${matchedGame?.backgroundColor}`}
        >
          <ResultCard
            matchedGame={matchedGame}
            GameScore={GameScore}
            justEndedGame={justEndedGame}
            nickname={'당신'}
          />
          <div className='flex flex-col justify-between w-[17.625rem] gap-[0.625rem] max-lg:flex-row max-lg:w-full max-md:px-4 max-md:pb-5 max-md:gap-4'>
            {unMatchedGames?.map((game) => {
              return (
                <Link
                  key={game.type}
                  href={`/games/${game.type}`}
                  className={`game ${game.type} next-game-card h-full rounded-[1.25rem] max-lg:w-full max-md:h-[11.25rem] max-md:rounded-2xl`}
                >
                  <div className='flex flex-col h-full p-6 max-md:px-3 max-md:py-[0.875rem]'>
                    <div className='pb-5'>
                      <div className='title-32 max-md:text-xl'>{game.name}</div>
                      {game.score === null ? (
                        <div className='title-24 max-md:text-sm'>하러가기</div>
                      ) : (
                        <div className='flex title-24 gap-1 max-md:text-sm'>
                          <div>
                            <span className='point'>현재 스코어: </span>
                            {game.score}점
                          </div>
                        </div>
                      )}
                    </div>
                    <div className='flex items-center justify-center w-12 h-12 rounded-full bg-current mt-auto max-md:w-10 max-md:h-10'>
                      <div className='icon-play text-white' />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className='flex items-center h-[8.625rem] px-[3.75rem] mt-[0.625rem] rounded-[1.25rem] bg-[#F1EFED] max-lg:px-6 max-md:w-full max-md:h-auto max-md:px-4 max-md:py-[1.125rem] max-md:mt-0 max-md:rounded-none max-md:bg-secondary-50'>
          <div className='flex items-center justify-between gap-2 w-full'>
            <div>
              <div className='body-22 text-gray-500 max-md:text-xs'>종합 랭킹을 확인하려면</div>
              <div className='body-30 text-gray-700 max-md:text-base max-sm:break-keep'>
                꼬옥 <span className='text-warning-300'>로그인</span> 후 게임을 <br className='hidden max-sm:block' />
                모두 플레이해 깨비!
              </div>
            </div>
            <div className='relative aspect-[250/106] w-[15.625rem] max-md:w-[11.25rem]'>
              <Image
                src='/icon_guide_to_play_for_guest.svg'
                alt='비회원 게임플레이 안내 아이콘'
                fill
                sizes='15.625rem'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guest;
