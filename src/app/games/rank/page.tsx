import { createClient } from '@/util/supabase/server';
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
// import Image from 'next/image';
import { Button } from '@/components/ui/button';
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

  //이번 랭킹 로직

  //이번주 테이블 모두 가져오고 전체 랭킹매겨주고 내 등수에 관한 로직(ui로 실시간 반영, supabase 반영 안됨)
  let userTable;

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
      const countRankng = data.map((item, index) => ({ ...item, ranking: index + 1 }));
      console.log('countRankng', countRankng);
      //이번주 내 등수
      userTable = countRankng?.filter((user) => user.user_id === userId);
    }
  }

  //지난 랭킹 로직

  //가장 최근 데이터의 week가 1주가 아닐때 실행시켜주고 && 지난주 테이블 랭킹에 점수가 안 들어가 있으면 지난주 최종점수를 기준으로 내림차순으로 가져와서 랭킹을 매겨서 랭킹점수에 넣어준다.
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
    console.log('myLastrank', myLastrank);

    return (
      <Card className='w-full max-w-2xl mx-auto'>
        <CardContent>
          <h1 className='text-2xl font-bold text-center text-blue-600 mb-6'>이번주 랭킹 순위</h1>

          <div className='space-y-3'>
            <ScrollArea className='h-[400px] rounded-lg'>
              <div className='space-y-3 pl-8  pr-8'>
                <div className='bg-blue-50 h-20 rounded-lg p-4 flex items-center gap-3'>{userTable?.[0].speaking}</div>
                <div className='bg-blue-50 h-20 rounded-lg p-4 flex items-center gap-3'></div>
                <div className='bg-blue-50 h-20 rounded-lg p-4 flex items-center gap-3'></div>
                <div className='bg-blue-50 h-20 rounded-lg p-4 flex items-center gap-3'></div>
                <div className='bg-blue-50 h-20 rounded-lg p-4 flex items-center gap-3'></div>
                <div className='bg-blue-50 h-20 rounded-lg p-4 flex items-center gap-3'></div>
                <div className='bg-blue-50 h-20 rounded-lg p-4 flex items-center gap-3'></div>
                <div className='bg-blue-50 h-20 rounded-lg p-4 flex items-center gap-3'></div>
                <div className='bg-blue-50 h-20 rounded-lg p-4 flex items-center gap-3'></div>
                <div className='bg-blue-50 h-20 rounded-lg p-4 flex items-center gap-3'></div>
                <div className='bg-blue-50 h-20 rounded-lg p-4 flex items-center gap-3'></div>
                <div className='bg-blue-50 h-20 rounded-lg p-4 flex items-center gap-3'></div>
              </div>
            </ScrollArea>

            <Card className='mt-6 bg-blue-50 p-4'>
              <div className='flex items-center gap-4'>
                <div>이미지</div>

                <div className='flex-1 grid grid-cols-3 gap-2 text-sm'>
                  <div>
                    <div className='text-gray-600'></div>
                    <div className='font-bold'>36등</div>
                  </div>
                  <div>
                    <div className='text-gray-600'>지난주 나의 순위</div>
                    <div className='font-bold'>57등</div>
                  </div>
                  <div className='grid grid-cols-2 gap-1'>
                    <div className='text-gray-600'>방문문문하기</div>
                    <div className='font-bold'>60회</div>
                    <div className='text-gray-600'>반갑하기</div>
                    <div className='font-bold'>80회</div>
                    <div className='text-gray-600'>행복하기</div>
                    <div className='font-bold'>50회</div>
                    <div className='text-gray-600'>좋은 하루</div>
                    <div className='font-bold'>150회</div>
                  </div>
                </div>
                <Button className='bg-blue-600 text-white hover:bg-blue-700'>내정보 확인하기</Button>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    );
  }

  // return <div>뭐지</div>;
};

export default RankingPage;
