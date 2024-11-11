import { JustEndedGameProp, matchedGameArrayForUser, Rank } from '@/types/result';
import { createClient } from '@/utils/supabase/server';
import { fetchUserId, fetchUserNickName } from '@/utils/auth/server-action';
import Link from 'next/link';
import React from 'react';
import ResultSide from '../_components/ResultSide';
import '../style.css';
import { redirect } from 'next/navigation';
import Image from 'next/image';

//http://localhost:3000/games/user?key=checking&score=100 이런식으로 들어올거임
const ResultPageForUser = async ({ searchParams }: JustEndedGameProp) => {
  const serverClient = createClient();

  //현재 접속중인 user의 nick name
  const nickName = await fetchUserNickName();

  //현재 접속중인 userID
  const userId = await fetchUserId();

  //회원이 아니면 메인으로 돌려보냄 = protected route
  if (!userId) {
    redirect('/');
  }

  //가장 최신 week 가져오기(숫자가 클수록 최신)->기준이 되는 week
  const { data: latestWeekData }: { data: Rank[] | null } = await serverClient
    .from('rank')
    .select()
    .not('week', 'is', null)
    .order('week', { ascending: false })
    .limit(1);

  //이번주
  const latestWeek = latestWeekData?.[0].week;

  // 이번주 테이블 다가져오기
  const { data: userTable }: { data: Rank[] | null } = await serverClient
    .from('rank')
    .select()
    .eq('week', latestWeek)
    .eq('user_id', userId);

  //객체분해할당 : user안에 담긴 객체 중에 게임점수 관련된 객체만 뽑아내서 객체 추가후 새로운 배열을 만드는 함수
  const extractGames = (game: Rank) => {
    const { checking, speaking, writing } = game;
    return [
      {
        type: 'checking',
        score: checking,
        color: 'bg-[#Ddd0f6]',
        name: '틀린 말 탐정단',
      },
      {
        type: 'speaking',
        score: speaking,
        color: 'bg-[#FEEFD7]',
        name: '나야, 발음왕',
      },
      { type: 'writing', score: writing, color: 'bg-[#D4F7EF]', name: '빈칸 한입' },
    ];
  };

  //해당 유저의 테이블이 동적으로 들어가면서 게임의 관련된 객체만 뽑아 정보를 추가해서 새로 만들어진 객체의 배열이 들어가는 games
  const games = userTable && userTable.length > 0 ? extractGames(userTable[0]) : null;

  //게임을 안하고 결과페이지 접근하려면 돌려보냄 = protected route
  const notFinishedGames = games?.filter((game) => game.score === null);
  if (notFinishedGames?.length === 3) {
    redirect('/');
  }

  //서치파람으로 가져온 방금 끝난 게임 이름
  const justEndedGame: string | undefined = searchParams.key;

  // 방금 끝난 게임 점수
  const GameScore: string | undefined = searchParams.score;

  //사용자가 방금 끝낸 게임
  const matchedGame = games?.find((game) => {
    return game.type === justEndedGame;
  });

  // 형태
  //matchedGame { type: 'writing', score: 100, color: 'mint', name: '빈칸채우기' }

  //사용자가 방금 끝내지 않은 게임
  const unMatchedGames = games?.filter((game) => {
    return game.type !== justEndedGame;
  });
  //형태
  // unMatchedGames [
  //   { type: 'checking', score: 100, color: 'purple', name: '틀린곳맞추기' },
  //   { type: 'speaking', score: 100, color: 'orange', name: '주어진문장읽기' }
  // ]

  // 다끝냈을때 다끝내지 않았을때만 정확하게 판별 (하지만 2문제 다 안풀었는지 1문제는 풀었는지는 판별안됨)
  // isdone= true : 모든문제 끝냄  isdone= false : 1문제만 끝냄, 2문제 모두 못끝냄
  const isDone = unMatchedGames?.every((game) => game.score !== null);

  // isdone이 false일때 1문제는 풀었는지 2문제 다 못풀었는지 배열안에 요소개수로 확인
  const remainingGamesCount = unMatchedGames?.filter((game) => game.score !== null).length;

  //3문제가 모두 완료되었을때 모든 점수를 합산하여 supabase total에 넣어줌
  if (isDone) {
    const totalScore = userTable?.reduce(
      (acc, current) => {
        const total = (current.checking || 0) + (current.speaking || 0) + (current.writing || 0);
        return { user_id: current.user_id, id: current.id, total };
      },
      { total: 0 },
    );

    const updateTotalScore = async () => {
      const { data, error } = await serverClient.from('rank').upsert(totalScore);
      if (error) {
        console.error('Error posting score data', error);
        return;
      }
      console.log('Score data posted successfully ', data);
    };
    updateTotalScore();
  }

  const game = (matchedGame: matchedGameArrayForUser) => {
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
              <span className='title-20 text-[#1965D2]'>{nickName}</span>
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
                <div className={`${game.color} h-[17.938rem] rounded-[1.25rem] ${game.type} `}>
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
        {isDone ? (
          <div className='flex items-center gap-24'>
            <Image
              width={224}
              height={108}
              src={`/icon_direct_to_rank.svg`}
              alt='랭킹보러가기 아이콘'
            />
            <div className='flex flex-col items-center'>
              <div className='body-22 text-[#838281]'>게임을 모두 완료했으니</div>
              <div>
                <div className='body-30 text-[#504F4E]'>
                  <span className='text-[#EF5252]'>종합 랭킹</span>을 확인하러 가볼 깨비!
                </div>
              </div>
            </div>
            <Link href={'/games/rank'}>
              <div className='flex justify-center items-center gap-3  w-[176px] h-[43px] rounded-[99px] border-2 border-[#B6B5B4] body-18 text-[#9D9C9A]'>
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
          <div className='flex gap-[221.04px]'>
            <div>
              <div className='body-22 text-[#838281]'>종합 랭킹을 확인하려면</div>
              <div className='body-30 text-[#504F4E]'>
                나머지 게임 <span className='text-[#EF5252]'>{remainingGamesCount === 1 ? '1개' : '2개'}</span>를 모두
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
