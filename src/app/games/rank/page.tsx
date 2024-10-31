// import { fetchUserId } from '@/util/rank/server-action';
import { createClient } from '@/util/supabase/server';
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
// import Image from 'next/image';
import { Button } from '@/components/ui/button';

const RankingPage = async () => {
  const serverClient = createClient();
  // const userId = await fetchUserId();

  //최신순 기준 가져오기
  const { data: latestWeekData } = await serverClient
    .from('rank')
    .select('week')
    .order('week', { ascending: false })
    .limit(1);
  //latestWeekData 형태 [ { week: 3 } ]

  if (latestWeekData && latestWeekData.length > 0) {
    const latestWeek = latestWeekData[0].week;
    //latestWeek 형태 3

    const { data } = await serverClient
      .from('rank')
      .select(`*,user(nickname, introduction, image)`)
      .eq('week', latestWeek)
      .gt('total', 0)
      .order('total', { ascending: false });
    console.log('data', data);

    if (data && data.length > 0) {
      const countRankng = data.map((item, index) => ({ ...item, ranking: index + 1 }));
      // const userTable = data?.filter((user) => user.user_id === userId);
      console.log('countRankng', countRankng);

      return (
        <Card className='w-full max-w-2xl mx-auto'>
          <CardContent>
            <h1 className='text-2xl font-bold text-center text-blue-600 mb-6'>이번주 랭킹 순위</h1>

            <div className='space-y-3'>
              <ScrollArea className='h-[400px] rounded-lg'>
                <div className='space-y-3 pl-8  pr-8'>
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
                  <div className='bg-blue-50 h-20 rounded-lg p-4 flex items-center gap-3'></div>
                </div>
              </ScrollArea>

              <Card className='mt-6 bg-blue-50 p-4'>
                <div className='flex items-center gap-4'>
                  <div>이미지</div>

                  <div className='flex-1 grid grid-cols-3 gap-2 text-sm'>
                    <div>
                      <div className='text-gray-600'>나의 랭킹</div>
                      <div className='font-bold'>36등</div>
                    </div>
                    <div>
                      <div className='text-gray-600'>나의 순위</div>
                      <div className='font-bold'>57등</div>
                    </div>
                    <div className='grid grid-cols-2 gap-1'>
                      <div className='text-gray-600'>방문하기</div>
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
  }

  return <div>뭐지</div>;
};

export default RankingPage;

// 토탈점수 있는거, 토탈점수로 내림차순, 닉네임, 최신인날짜

{
  /* <Card className='w-full h-4/6 max-w-2xl mx-auto flex flex-col'>
          <CardContent>
            <h1 className='flex justify-center items-center h-20 '>이번주 랭킹 순위</h1>

            <ScrollArea className=' h-[600px] w-full border p-4 rounded-lg'>
              <div className='space-y-3 pr-4'>
                {countRankng.map((item) => (
                  <Card
                    key={item.id}
                    className='h-20 flex rounded-lg p-4 items-center gap-3 '
                  >
                    <div>{item.ranking}등</div>
                    {item.user.image ? (
                      <Image
                        src={item.user.image}
                        alt={`${item.user.nickname}의 프로필`}
                      ></Image>
                    ) : (
                      <div>이미지</div>
                    )}

                    <div>{item.user.nickname}</div>
                    {item.user.introduction ? <div>{item.user.introduction}</div> : <div>자기소개하세요</div>}

                    <div>{item.total}점</div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
            <div>
              {userTable.map((item) => (
                <Card key={item.id}>
                  {item.user.image ? (
                    <Image
                      src={item.user.image}
                      alt={`${item.user.nickname}의 프로필`}
                    ></Image>
                  ) : (
                    <div>이미지</div>
                  )}
                  <div>
                    <div>{item.user.nickname}</div>
                    {item.user.introduction ? <div>{item.user.introduction}</div> : <div>자기소개하세요</div>}
                  </div>
                  <div>
                    <div>{item.ranking}등</div>
                    <div>지난주 순위 ~등</div>
                  </div>
                  <div>
                    <div>주어진 문장읽기 </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card> */
}

{
  /* <div className='space-y-3 pr-4'>
{countRankng.map((item) => (
  <div
    key={item.key}
    className='bg-blue-50 rounded-lg p-4 flex items-center gap-3'
  >
    <div className='font-bold text-lg w-8'>{item.ranking}등</div>
    {item.user.image ? (
      <Image
        src={item.user.image}
        alt={`${item.user.nickname}의 프로필`}
      ></Image>
    ) : (
      <div>이미지</div>
    )}
    <div className='flex-1'>
      <div className='font-medium'>{item.name}</div>
      <div className='text-sm text-gray-600'>{item.description}</div>
    </div>
    <div className='font-bold text-blue-600'>{item.total}점</div>
  </div>
))}
</div> */
}
