import { JustEndedGameProp } from '@/types/result';
import { Rank, RankIncludingUserInfo } from '@/types/rank';
import { createClient } from '@/utils/supabase/server';
import { fetchUserId } from '@/utils/auth/server-action';
import Link from 'next/link';
import React from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { fetchLatestWeekData, updateTotalScore } from '@/utils/rank/server-action';
import LineTitle from '@/components/LineTitle';
import { Medal } from 'lucide-react';
import ResultCard from '../_components/ResultCard';
// import { Button } from '@/components/ui/button';
// import Modal from '../_components/Modal';

const ResultPageForUser = async ({ searchParams }: JustEndedGameProp) => {
  const serverClient = createClient();
  const userId = await fetchUserId();
  const latestWeekData = await fetchLatestWeekData();

  if (!userId) {
    redirect('/');
  }

  const latestWeek = latestWeekData?.week;
  const { data: userTable }: { data: RankIncludingUserInfo | null } = await serverClient
    .from('rank')
    .select(`*,user(nickname)`)
    .eq('week', latestWeek)
    .eq('user_id', userId)
    .single();

  const games = userTable ? extractGames(userTable) : null;

  const notFinishedGames = games?.filter((game) => game.score === null);
  if (notFinishedGames?.length === 3) {
    redirect('/');
  }

  const justEndedGame: string | undefined = searchParams.key;

  const GameScore: string | undefined = searchParams.score;

  const matchedGame = games?.find((game) => game.type === justEndedGame);
  const unMatchedGames = games?.filter((game) => game.type !== justEndedGame);

  const isDone = unMatchedGames?.every((game) => game.score !== null);

  const remainingGamesCount = unMatchedGames?.filter((game) => game.score !== null).length;

  if (isDone && userTable) {
    const totalScore = {
      user_id: userTable.user_id,
      id: userTable.id,
      total: (userTable.checking || 0) + (userTable.speaking || 0) + (userTable.writing || 0),
    };

    updateTotalScore(totalScore);
  }

  return (
    <div className='container py-11 max-md:p-0'>
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

      <div className='flex h-[36.5rem] gap-[0.625rem] max-lg:flex-col max-lg:h-auto'>
        <ResultCard
          matchedGame={matchedGame}
          GameScore={GameScore}
          justEndedGame={justEndedGame}
          nickname={userTable?.user.nickname}
        />
        <div className='flex flex-col justify-between w-[17.625rem] gap-[0.625rem] max-lg:flex-row max-lg:w-full'>
          {unMatchedGames?.map((game) => {
            return (
              <Link
                key={game.type}
                href={`/games/${game.type}`}
                className={`game ${game.type} h-full rounded-[1.25rem] max-lg:w-full`}
              >
                <div className='flex flex-col h-full p-6'>
                  <div className='pb-5'>
                    {game.score === null ? (
                      <>
                        <div className='title-32'>{game.name}</div>
                        <div className='title-24'>하러가기</div>
                      </>
                    ) : (
                      <>
                        <div className='title-32'>{game.name}</div>
                        <div className='flex title-24 gap-1'>
                          <div>
                            <span className='point'>현재 스코어: </span>
                            {game.score}점
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className='flex items-center justify-center w-12 h-12 rounded-full bg-current mt-auto'>
                    <div className='icon-play text-white' />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className='flex items-center h-[8.625rem] px-[3.75rem] mt-[0.625rem] rounded-[1.25rem] bg-[#F1EFED] max-md:w-full'>
        <div className='flex items-center justify-between w-full'>
          {isDone ? (
            <>
              <Image
                width={224}
                height={108}
                src={`/icon_direct_to_rank.svg`}
                alt='랭킹보러가기 아이콘'
              />
              <div className='flex flex-col items-center'>
                <div className='body-22 text-gray-500'>게임을 모두 완료했으니</div>
                <div>
                  <div className='body-30 text-gray-700'>
                    <span className='text-warning-300'>종합 랭킹</span>을 확인하러 가볼 깨비!
                  </div>
                </div>
              </div>
              <Link href={'/games/rank'}>
                <div className='flex justify-center items-center gap-3 min-w-[11rem] h-11 rounded-full border-2 body-18 border-gray-300 text-gray-400'>
                  랭킹 보러가기
                  <Medal />
                </div>
              </Link>
            </>
          ) : (
            <>
              <div>
                <div className='body-22 text-gray-500'>종합 랭킹을 확인하려면</div>
                <div className='body-30 text-gray-700'>
                  나머지 게임 <span className='text-warning-300'>{remainingGamesCount === 1 ? '1개' : '2개'}</span>를
                  모두 플레이 해야해 깨비!
                </div>
              </div>
              <Image
                width={230}
                height={93.2}
                src={`/icon_guide_to_play.svg`}
                alt='회원 게임플레이 안내 아이콘'
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ResultPageForUser;

const extractGames = (game: Rank) => {
  const { speaking, checking, writing } = game;
  return [
    {
      type: 'speaking',
      score: speaking,
      name: '나야, 발음왕',
      backgroundColor: 'bg-[#FEEFD7]',
      titleColor1: 'text-secondary-700',
      titleColor2: 'text-secondary-600',
      lineColor: 'bg-secondary-200',
    },
    {
      type: 'checking',
      score: checking,
      name: '틀린 말 탐정단',
      backgroundColor: 'bg-tertiary-p-100',
      titleColor1: 'text-tertiary-p-700',
      titleColor2: 'text-tertiary-p-400',
      lineColor: 'bg-tertiary-p-200',
    },
    {
      type: 'writing',
      score: writing,
      name: '빈칸 한입',
      backgroundColor: 'bg-tertiary-g-100',
      titleColor1: 'text-tertiary-g-800',
      titleColor2: 'text-tertiary-g-600',
      lineColor: 'bg-tertiary-g-200',
    },
  ];
};
