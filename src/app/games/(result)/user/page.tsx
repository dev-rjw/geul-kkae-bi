import { JustEndedGameProp } from '@/types/result';
import { Rank, RankIncludingUserInfo } from '@/types/rank';
import { createClient } from '@/utils/supabase/server';
import { fetchUserId } from '@/utils/auth/server-action';
import Link from 'next/link';
import React from 'react';
import ResultSide from '../_components/ResultSide';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { fetchLatestWeekData, updateTotalScore } from '@/utils/rank/server-action';
import { highlightScoreForMatchedGame } from '../utils/highlightScoreForMatchedGame';
import LineTitle from '@/components/LineTitle';
// import { Button } from '@/components/ui/button';
import kakaoTalkShare from '../_components/kakaoTalkShare';
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
    <div className='container py-11'>
      <div className='flex justify-center pb-[2.375rem]'>
        <LineTitle
          className='text-primary-400 title-34 font-normal'
          lineClassName={`-bottom-2 w-[calc(100%+20px)] h-4/6 ${matchedGame?.lineColor}`}
        >
          <span className={matchedGame?.titleColor1}>
            {matchedGame?.name} <span className={matchedGame?.titleColor2}>결과</span>
          </span>
        </LineTitle>
      </div>

      <div className='flex flex-row h-[36.5rem]'>
        <div className={`flex w-[49.5rem] rounded-[1.25rem] ${matchedGame?.backgroundColor} `}>
          <ResultSide
            GameScore={GameScore}
            justEndedGame={justEndedGame}
          />{' '}
          <Image
            src='/kakaotalk.png'
            alt='카카오톡 공유 보내기 버튼'
            onClick={kakaoTalkShare}
            width={100}
            height={100}
            className='cursor-pointer'
          />
          <div className='flex flex-col items-center text-center pl-[2.929rem] pt-[7.5rem] '>
            <div className={`${matchedGame?.type} `}>
              <span className='title-20 text-primary-500'>{userTable?.user.nickname}</span>
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

            {/* 테스트 중 */}
            {/* <div className='mt-6'>
              <Button asChild>
                <Link href={`/share/url?key=${justEndedGame}&score=${GameScore}&nickname=${userTable?.user.nickname}`}>공유하기</Link>
              </Button>
            </div> */}
            {/*             <Modal /> */}
          </div>
        </div>
        <div className='flex flex-col pl-2.5 justify-between w-[17.438rem]'>
          {unMatchedGames?.map((game) => {
            return (
              <Link
                key={game.type}
                href={`/games/${game.type}`}
              >
                <div className={`game h-[17.938rem] rounded-[1.25rem] ${game.type}`}>
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
      <div className='flex justify-center items-center marker:h-[138px]'>
        {isDone ? (
          <div className='flex items-center gap-24'>
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
              <div className='flex justify-center items-center gap-3  w-[176px] h-[43px] rounded-full border-2 border-gray-300 body-18 text-gray-400'>
                랭킹 보러가기
                <Image
                  width={24}
                  height={24}
                  src={`/icon_camera.svg`}
                  alt='랭킹 버튼 아이콘'
                />
              </div>
            </Link>
          </div>
        ) : (
          <div className='flex gap-[13.7rem]'>
            <div>
              <div className='body-22 text-gray-500'>종합 랭킹을 확인하려면</div>
              <div className='body-30 text-gray-700'>
                나머지 게임 <span className='text-warning-300'>{remainingGamesCount === 1 ? '1개' : '2개'}</span>를 모두
                플레이 해야해 깨비!
              </div>
            </div>
            <Image
              width={230}
              height={93.2}
              src={`/icon_guide_to_play.svg`}
              alt='회원 게임플레이 안내 아이콘'
            />
          </div>
        )}
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
