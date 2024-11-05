import { createClient } from '@/util/supabase/server';
import React from 'react';
// import Image from 'next/image';
import { fetchUserId } from '@/util/auth/server-action';
import { Rank, RankIncludingUserInfo } from '@/types/result';
import Image from 'next/image';

const RankingPage = async () => {
  const serverClient = createClient();
  const userId = await fetchUserId();

  //가장 최신 week 가져오기(숫자가 클수록 최신)->기준이 되는 week
  const { data: latestWeekData }: { data: Rank[] | null } = await serverClient
    .from('rank')
    .select()
    .not('week', 'is', null)
    .order('week', { ascending: false })
    .limit(1);

  console.log('latestWeekData', latestWeekData);
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
  //똑같은 점수인 경우에는 먼저 점수를 흭득한사람이 앞등수
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
      <div className='h-[958]'>
        <header className='max-w-7xl w-full h-20 fixed bg-yellow-700'>글깨비</header>
        <div className='flex flex-col justify-center items-center pt-20'>
          <div className='flex flex-col items-center w-[1080px] h-[805px] mt-8 bg-slate-300 rounded-[50px] '>
            <div className='flex justify-center items-center w-[302px] h-[51px] mt-8'>
              <div className='flex justify-between h-8 px-[8.5px] gap-x-2'>
                <div className='w-[45px] h-[45px] bg-slate-500'>아이콘</div>
                <h1 className='text-4xl'>이번주 랭킹순위</h1>
              </div>
            </div>
            <div className='w-[1050px] h-[540px] overflow-y-scroll space-y-5 mt-8 '>
              {countRanking?.map((item) => (
                <div
                  key={item.id}
                  className='bg-slate-400 w-[896px] h-[100px] mx-auto rounded-2xl'
                >
                  <div>{item.ranking}</div>
                  <Image
                    width={78}
                    height={78}
                    src={item.user.image}
                    alt='profile image for ranking'
                  />
                  <div>{item.user.nickname}</div>
                  <div>{item.user.introduction}</div>
                  <div>{item.total}</div>
                </div>
              ))}
            </div>
            <div className='flex w-[1080px] h-[151px] bg-slate-200 rounded-[20px]'>
              <div className='flex gap-[24px] ml-[24px] mt-[20px]'>
                <div className='w-[131px] h-[111px] rounded-[22.37px] bg-slate-300'>사진</div>
                <div className='flex flex-col items-center gap-[5px]'>
                  <div className='w-[107px] h-[27px] bg-slate-300'>한굴도둑밥도둑</div>
                  <div className='w-[214px] h-[79px] bg-slate-300 rounded-[12px]'>문해력 올리기 완전 정복!!!!!!!</div>
                </div>
              </div>
            </div>
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
      </div>
    );
  }
};

export default RankingPage;
