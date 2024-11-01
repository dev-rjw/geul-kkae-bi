import { JustEndedGameProp, UserTable } from '@/types/result';
import { fetchUserId, fetchUserNickName } from '@/util/rank/server-action';
import { createClient } from '@/util/supabase/server';
import Link from 'next/link';
import React from 'react';

//http://localhost:3000/games/user?key=checking 이런식으로 들어올거임
const ResultPageForUser = async ({ searchParams }: JustEndedGameProp) => {
  const serverClient = createClient();

  //현재 접속중인 user의 nick name
  const nickName = await fetchUserNickName();

  //supabase에서 rank table 다 가져와서 변수 resultScore에 담아짐 (이부분도 따로 위로 뺄 수 있음 refactoring시에)
  const { data: resultScore } = await serverClient.from('rank').select();

  //현재 접속중인 userID
  const userId = await fetchUserId();

  //rank table에 해당 유저에 관련된 데이터만 가져와서 변수 userTable에 담아짐(2주치가 있다면 게임기록 2개가 들어감)
  const userTable = resultScore?.filter((user) => user.user_id === userId) as UserTable[];
  // 담기는 형태(테이블2개있을시)
  // userTable [
  //{
  //   user_id: '3627f20f-4884-4671-b28a-101dcb72dbac',
  //   checking: 100,
  //   speaking: 100,
  //   writing: 100,
  //   created_at: '2024-10-24T10:32:50.692893+00:00'
  //   id: '1e0ecb68-78eb-4469-bbc4-92a218894a1e',
  // },
  // { user_id: '3627f20f-4884-4671-b28a-101dcb72dbac',
  //   checking: 100,
  //   speaking: 100,
  //   writing: 100,
  //   created_at: '2024-10-25T10:32:50.692893+00:00'}
  //   id: '49ccea5c-d427-4d9e-a612-83b21a81d112',
  //]

  // console.log('userTable나야유저테이블', userTable);

  //해당 유저의 rank table에서 가장 최신의 rank table 가져오는 함수
  const lastestUserTable = userTable.reduce((lastest, current) => {
    return new Date(current.created_at) > new Date(lastest.created_at) ? current : lastest;
  });

  // console.log('lastestUserTable', lastestUserTable);

  //객체분해할당 : user안에 담긴 객체 중에 게임점수 관련된 객체만 뽑아내서 객체 추가후 새로운 배열을 만드는 함수
  const extractGames = (game: UserTable) => {
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
  const games = extractGames(lastestUserTable);

  //서치파람으로 가져온 방금 끝난 게임 이름
  const justEndedGame: string | undefined = searchParams.key;

  // 방금 끝난 게임 점수
  const GameScore: string | undefined = searchParams.score;

  //사용자가 방금 끝낸 게임
  const matchedGame = games.find((game) => {
    return game.type === justEndedGame;
  });

  // console.log('matchedGame', matchedGame);
  // 형태
  //matchedGame { type: 'writing', score: 100, color: 'mint', name: '빈칸채우기' }

  //사용자가 방금 끝내지 않은 게임
  const unMatchedGames = games.filter((game) => {
    return game.type !== justEndedGame;
  });
  //형태
  // unMatchedGames [
  //   { type: 'checking', score: 100, color: 'purple', name: '틀린곳맞추기' },
  //   { type: 'speaking', score: 100, color: 'orange', name: '주어진문장읽기' }
  // ]

  // 다끝냈을때 다끝내지 않았을때만 정확하게 판별 (하지만 2문제 다 안풀었는지 1문제는 풀었는지는 판별안됨)
  // isdone= true : 모든문제 끝냄  isdone= false : 1문제만 끝냄, 2문제 모두 못끝냄
  const isDone = unMatchedGames.every((game) => game.score);

  // isdone이 false일때 1문제는 풀었는지 2문제 다 못풀었는지 배열안에 요소개수로 확인
  const remainingGamesCount = unMatchedGames.filter((game) => !game.score).length;

  const playMessage = isDone
    ? `잘했다 깨비! 이제 랭킹을 확인해봐 깨비!`
    : remainingGamesCount === 1
    ? `종합 랭킹을 확인하려면 나머지 게임 1개를 마저 플레이 해야해 깨비!`
    : `종합 랭킹을 확인하려면 나머지 게임 2개를 마저 플레이 해야해 깨비!`;

  //3문제가 모두 완료되었을때 모든 점수를 합산하여 supabase total에 넣어줌
  if (isDone) {
    const totalScore = userTable.reduce(
      (acc, current) => {
        const total = (current.checking || 0) + (current.speaking || 0) + (current.writing || 0);
        return { user_id: current.user_id, id: current.id, total };
      },
      { total: 0 },
    );
    // console.log('totalScore', totalScore);

    const updateTotalScore = async () => {
      const { data, error } = await serverClient.from('rank').upsert(totalScore);
      if (error) {
        // console.error('Error posting data', error);
        return;
      }
      console.log('Data posted successfully ', data);
    };
    updateTotalScore();
  }

  return (
    <div>
      <div className='w-[590] flex justify-between'>
        <div>{matchedGame?.name}</div>
        <div>
          {isDone ? (
            <div>
              <Link href={'/games/rank'}>랭킹보러가기</Link>
              <Link href={'/'}>홈으로</Link>
            </div>
          ) : (
            <Link href={'/'}>홈으로</Link>
          )}
        </div>
      </div>
      <div className='flex flex-row'>
        <div className={`w-96 h-[415] ${matchedGame?.color}`}>
          <div>{nickName}님의 국어 문해력은</div>
          <div>{GameScore}</div>
          <div>캐릭터이미지</div>
          <div>점수에 따라 달라지는 점수평 이것도 if문?</div>
        </div>
        <div>
          {unMatchedGames.map((game) => {
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
      <div>{playMessage}</div>
    </div>
  );
};

export default ResultPageForUser;
