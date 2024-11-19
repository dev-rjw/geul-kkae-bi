import React from 'react';
import { redirect } from 'next/navigation';
import { JustEndedGameProp } from '@/types/result';
import { Rank } from '@/types/rank';
import { fetchUserId } from '@/utils/auth/server-action';
import { fetchLatestWeekData, fetchUserRankDataThisWeek, updateTotalScore } from '@/utils/rank/server-action';
import LineTitle from '@/components/LineTitle';
import ResultCard from '../_components/ResultCard';
import StatusCard from '../_components/StatusCard';
import GuideBanner from '../_components/GuideBanner';
// import Modal from '../_components/Modal';

const ResultPageForUser = async ({ searchParams }: JustEndedGameProp) => {
  const [userId, latestWeekData] = await Promise.all([fetchUserId(), fetchLatestWeekData()]);

  if (!userId) {
    redirect('/');
  }

  const latestWeek = latestWeekData?.week;

  const userTable = await fetchUserRankDataThisWeek(userId, latestWeek);

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
    <div className='container py-8 max-md:p-0'>
      <div className='flex max-md:hidden justify-center pb-[2.375rem]'>
        <LineTitle
          className='title-34 font-normal'
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
          nickname={userTable?.user.nickname}
        />
        <StatusCard unMatchedGames={unMatchedGames} />
      </div>
      <GuideBanner
        isDone={isDone}
        remainingGamesCount={remainingGamesCount}
      />
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
      backgroundColor: 'bg-[#FEEFD7] max-md:bg-[#FEEFD7]',
      titleColor1: 'text-secondary-700',
      titleColor2: 'text-secondary-600',
      lineColor: 'bg-secondary-200',
    },
    {
      type: 'checking',
      score: checking,
      name: '틀린 말 탐정단',
      backgroundColor: 'bg-tertiary-p-100 max-md:bg-tertiary-p-100',
      titleColor1: 'text-tertiary-p-700',
      titleColor2: 'text-tertiary-p-400',
      lineColor: 'bg-tertiary-p-200',
    },
    {
      type: 'writing',
      score: writing,
      name: '빈칸 한입',
      backgroundColor: 'bg-tertiary-g-100 max-md:bg-tertiary-g-100',
      titleColor1: 'text-tertiary-g-800',
      titleColor2: 'text-tertiary-g-600',
      lineColor: 'bg-tertiary-g-200',
    },
  ];
};
