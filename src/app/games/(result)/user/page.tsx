import { JustEndedGameProp, Rank } from '@/types/result';
import { fetchUserId, fetchUserNickName } from '@/util/auth/server-action';
import { createClient } from '@/util/supabase/server';
import Link from 'next/link';
import React from 'react';
import ResultSide from '../_components/ResultSide';
import '../style.css';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

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
  //null이 있으면 가장 위에 null이 들어와서 오류가뜸
  const { data: latestWeekData }: { data: Rank[] | null } = await serverClient
    .from('rank')
    .select()
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
        color: 'bg-purple-300',
        name: '틀린곳맞추기',
      },
      {
        type: 'speaking',
        score: speaking,
        color: 'bg-orange-200',
        name: '주어진문장읽기',
      },
      { type: 'writing', score: writing, color: 'bg-teal-100', name: '빈칸채우기' },
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
  const isDone = unMatchedGames?.every((game) => game.score);

  // isdone이 false일때 1문제는 풀었는지 2문제 다 못풀었는지 배열안에 요소개수로 확인
  const remainingGamesCount = unMatchedGames?.filter((game) => !game.score).length;

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

  return (
    <div>
      <div>{matchedGame?.name}</div>

      <div className='flex flex-row'>
        <ResultSide
          GameScore={GameScore}
          justEndedGame={justEndedGame}
        />
        <div className={`w-96 h-[415] ${matchedGame?.color}`}>
          <div>{nickName}님의 국어 문해력은</div>
          <div>{GameScore}</div>
          <div>캐릭터이미지</div>
        </div>
        <div>
          {unMatchedGames?.map((game) => {
            return (
              <Link
                key={game.type}
                href={`/games/${game.type}`}
              >
                <div className={`w-52 h-52 ${game.color} `}>
                  {game.score ? `${game.name}${game.score}점` : `${game.name}하러가기`}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div>
        {isDone ? (
          <>
            <div>게임을 모두 완료했으니</div>
            <div>
              <div>
                종합 <span className='text-orange-200'>랭킹</span>을 확인하러 가 볼 깨비!
              </div>
            </div>
            <Button>랭킹 보러가기</Button>
          </>
        ) : (
          <>
            <div>종합 랭킹을 확인하려면</div>
            <div>
              나머지 게임 <span className='text-orange-200'>{remainingGamesCount === 1 ? '1개' : '2개'}</span>를 모두
              플레이 해야해 깨비!
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ResultPageForUser;
