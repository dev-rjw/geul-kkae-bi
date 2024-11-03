import { createClient } from '@/util/supabase/server';
import React from 'react';
// import Image from 'next/image';
import { fetchUserId } from '@/util/rank/server-action';
import { Rank, RankIncludingUserInfo } from '@/types/result';

const RankingPage = async () => {
  const serverClient = createClient();
  const userId = await fetchUserId();

  //가장 최신 week 가져오기(숫자가 클수록 최신)->기준이 되는 week
  const { data: latestWeekData }: { data: Rank[] | null } = await serverClient
    .from('rank')
    .select()
    .order('week', { ascending: false })
    .limit(1);
  // latestWeekData [
  //   {
  //     user_id: 'e651a7f4-9594-4e10-9fdf-f6858b26fd59',
  //     checking: 20,
  //     speaking: 0,
  //     writing: 20,
  //     created_at: '2024-11-01T03:20:24.031187+00:00',
  //     id: 'dc29e732-880c-4397-9c1d-c547f03e26e9',
  //     total: 60,
  //     week: 2,
  //     ranking: null
  //   }
  // ]

  //이번주 랭킹 로직

  //이번주 테이블 모두 가져오고 전체 랭킹매겨주고 내 등수에 관한 로직(ui로 실시간 반영, supabase 반영 안됨)
  let userTable;
  let countRanking;

  if (latestWeekData && latestWeekData.length > 0) {
    const latestWeek = latestWeekData[0].week;

    const { data }: { data: RankIncludingUserInfo[] | null } = await serverClient
      .from('rank')
      .select(`*,user(nickname, introduction, image)`)
      .eq('week', latestWeek)
      .gt('total', 0)
      .order('total', { ascending: false });

    if (data && data.length > 0) {
      //이번주 전체 등수
      countRanking = data.map((item, index) => ({ ...item, ranking: index + 1 }));
      console.log('countRanking', countRanking);
      //이번주 내 등수
      userTable = countRanking?.filter((user) => user.user_id === userId);
    }
  }
  console.log('userTable', userTable);
  console.log('countRanking', countRanking);
  //지난주 랭킹 로직

  //가장 최근 데이터의 week가 1주가 아닐때 실행시켜주고 && 지난주 테이블 랭킹에 점수가 안 들어가 있으면 지난주 최종점수를 기준으로 내림차순으로 가져와서 랭킹을 매겨서 supabase 랭킹점수에 넣어준다.
  if (latestWeekData && latestWeekData[0].week - 1 > 0) {
    const lastWeek = latestWeekData[0].week - 1;

    //지난주 테이블 모두 가져오는데 토탈점수가 높은거부터 내림차순 정렬
    const { data: lastWeekData } = await serverClient
      .from('rank')
      .select()
      .eq('week', lastWeek)
      .not('total', 'is', null)
      .order('total', { ascending: false });
    console.log('lastWeekData', lastWeekData);

    //지난주 테이블에 랭킹 기록이 없을시에 랭킹을 매겨주고 랭킹을 넣어줌
    if (lastWeekData?.[0].ranking === null) {
      const countRanking: Rank[] | null = lastWeekData?.map((item, index) => ({
        ...item,
        ranking: index + 1,
      }));
      const insertLastRankingData = async () => {
        const { data, error } = await serverClient.from('rank').upsert(countRanking);
        if (error) {
          console.error('Error posting Ranking data', error);
          return;
        }
        console.log('Ranking Data posted successfully', data);
      };
      insertLastRankingData();
    }
    //내 아이디랑 일치하는 지난 테이블 가져오는 로직
    const { data: myLastrank }: { data: Rank[] | null } = await serverClient
      .from('rank')
      .select()
      .eq('user_id', userId)
      .eq('week', lastWeek);

    return (
      <div>
        <div className='flex flex-col gap-5'>
          {countRanking?.map((item) => (
            <div
              key={item.id}
              className='flex gap-3 bg-slate-400'
            >
              <div>{item.ranking}</div>
              <div>{item.user.image}</div>
              <div>{item.user.nickname}</div>
              <div>{item.user.introduction}</div>
              <div>{item.total}</div>
            </div>
          ))}
        </div>
        <div>
          <div>닉네임 : {userTable?.[0].user.nickname}</div>
          <div>소개 : {userTable?.[0].user.introduction}</div>
          <div>나의 랭킹 : {userTable?.[0].ranking}</div>
          <div> {myLastrank ? <div>{`지난주 순위 : ${myLastrank[0].ranking}`}</div> : <div>지난주 순위 : </div>}</div>
          <div>주어진 문장읽기 : {userTable?.[0].speaking}</div>
          <div>빈칸 채우기 : {userTable?.[0].writing}</div>
          <div>틀린것 맞추기 : {userTable?.[0].checking}</div>
          <div>총합 점수 : {userTable?.[0].total}</div>
        </div>
      </div>
    );
  }
};

export default RankingPage;
