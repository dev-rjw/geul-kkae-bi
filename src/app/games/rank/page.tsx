import { createClient } from '@/utils/supabase/server';
import React from 'react';
// import Image from 'next/image';
import { Rank, RankIncludingUserInfo } from '@/types/result';
import { fetchUserId } from '@/utils/auth/server-action';
import Image from 'next/image';
import './style.css';
import Link from 'next/link';

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
      .gte('total', 0)
      .order('total', { ascending: false });

    if (data && data.length > 0) {
      //이번주 전체 등수
      countRanking = data.map((item, index) => ({ ...item, ranking: index + 1 }));
      //이번주 내 등수
      userTable = countRanking?.filter((user) => user.user_id === userId);
    }
  }

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

    //지난주 테이블에 랭킹 기록이 없을시에 랭킹을 매겨주고 랭킹을 넣어줌
    if (lastWeekData?.[0].ranking === null) {
      const countRanking: Rank[] | null = lastWeekData?.map((item, index) => ({
        ...item,
        ranking: index + 1,
      }));
      const insertLastRankingData = async () => {
        const { error } = await serverClient.from('rank').upsert(countRanking);
        if (error) {
          console.error('Error posting Ranking data', error);
          return;
        }
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
      <div className='container pt-10 pb-4'>
        <div
          className='scrollbar-primary flex flex-col pt-8 pb-[9.375rem] rounded-[3.125rem] bg-primary-50'
          style={{ height: 'calc(100vh - 136px)' }}
        >
          <div className='flex items-center justify-center gap-x-2'>
            <Image
              src='/icon_rank.svg'
              width={45}
              height={45}
              quality={85}
              alt='랭킹순위 옆 아이콘'
            />
            <h2 className='title-36 text-primary-400 mt-1 -mb-2'>이번주 전체 랭킹 순위</h2>
          </div>
          <div className='h-full mx-4 mt-7 overflow-y-scroll'>
            <div className='grid gap-5 pl-[4.75rem] pr-[3.813rem] pb-5'>
              {countRanking?.slice(0, 3)?.map((item) => (
                <div
                  key={item.id}
                  className='top-rank flex items-center bg-[#98A7F1] w-full h-[6.25rem] px-8 py-2 mx-auto rounded-[1rem]'
                >
                  <div className='flex items-center gap-4'>
                    <div className='w-[3rem] title-24 text-primary-700 -mb-1'>{item.ranking}등</div>
                    <div className='relative w-[4.875rem] h-[4.875rem] rounded-sm overflow-hidden'>
                      <Image
                        src={item.user.image}
                        alt='profile image for my ranking'
                        quality={85}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <strong className='title-24 w-[11.25rem] text-primary-700 -mb-1'>{item.user.nickname}</strong>
                    <p className=' grow title-24 text-white/60 -mb-1'>{item.user.introduction}</p>
                  </div>
                  <span className='body-36 ml-auto text-primary-700'>{item.total}점</span>
                </div>
              ))}
              {countRanking?.slice(3, 5)?.map((item) => (
                <div
                  key={item.id}
                  className='top-rank flex items-center bg-[#C5CDF7] w-full h-[4.75rem] px-8 py-[0.375rem] mx-auto rounded-[1rem]'
                >
                  <div className='flex items-center gap-4'>
                    <div className='w-[3rem] title-20 text-primary-700 -mb-1'>{item.ranking}등</div>
                    <div className='relative w-[3.875rem] h-[3.875rem] rounded-sm overflow-hidden'>
                      <Image
                        src={item.user.image}
                        alt='profile image for my ranking'
                        quality={85}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <strong className='title-20 w-[8.625rem] text-primary-700 -mb-1'>{item.user.nickname}</strong>
                    <p className=' grow title-20 text-[#647BEE] -mb-1'>{item.user.introduction}</p>
                  </div>
                  <span className='body-36 ml-auto text-primary-700'>{item.total}점</span>
                </div>
              ))}
              {countRanking?.slice(5)?.map((item) => (
                <div
                  key={item.id}
                  className='top-rank flex items-center bg-[#C5CDF7] w-full h-[3.25rem] px-8 py-1 mx-auto rounded-[1rem]'
                >
                  <div className='flex items-center gap-4'>
                    <div className='w-[3rem] title-20 text-primary-700 -mb-1'>{item.ranking}등</div>
                    <div className='relative w-[2.5rem] h-[2.5rem] rounded-sm overflow-hidden'>
                      <Image
                        src={item.user.image}
                        alt='profile image for my ranking'
                        quality={85}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <strong className='title-20 w-[8.625rem] text-primary-700 -mb-1'>{item.user.nickname}</strong>
                    <p className=' grow title-20 text-[#647BEE] -mb-1'>{item.user.introduction}</p>
                  </div>
                  <span className='body-32 ml-auto text-primary-700'>{item.total}점</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='container fixed bottom-4 left-1/2 -translate-x-1/2'>
          <div className='h-[9.375rem] flex items-center px-6 py-[1.125rem] bg-primary-100 rounded-[1.25rem]'>
            <div className='relative w-[6.875rem] h-[6.875rem] rounded-[1.25rem] overflow-hidden'>
              <Image
                src={userTable?.[0]?.user.image ?? ''}
                alt='profile image for my ranking'
                quality={85}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div className='flex grow gap-[2.75rem] h-full pl-[2.125rem]'>
              <div className='flex items-center grow gap-[2.75rem]'>
                <div className='flex flex-col self-stretch w-full'>
                  <div className='flex items-center justify-center body-16 mb-4 text-primary-400'>
                    {userTable?.[0]?.user.nickname}
                  </div>
                  <div className='flex items-center justify-center h-full caption-14 bg-primary-50 rounded-[0.875rem]'>
                    {userTable?.[0]?.user.introduction}
                  </div>
                </div>
                <div className='flex flex-col justify-between gap-4 w-full max-w-[12.813rem] title-20'>
                  <div className='flex items-center justify-between'>
                    <div className='text-primary-700'>나의 랭킹</div>
                    <div className='text-primary-400'>{userTable?.[0]?.ranking}등</div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='text-primary-700'>지난주 순위</div>
                    <div className='text-primary-600'>{myLastrank ? myLastrank?.[0]?.ranking : ''}등</div>
                  </div>
                </div>
                <div className='flex flex-col justify-between self-stretch w-full max-w-[15.25rem] title-16'>
                  <div className='flex items-center justify-between'>
                    <div className='text-primary-700'>주어진 문장읽기</div>
                    <div className='text-primary-600'>{userTable?.[0]?.speaking}점</div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='text-primary-700'>빈칸채우기</div>
                    <div className='text-primary-600'>{userTable?.[0]?.writing}점</div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='text-primary-700'>틀린것 맞추기</div>
                    <div className='text-primary-600'>{userTable?.[0]?.checking}점</div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='text-primary-700'>총합 점수</div>
                    <div className='text-primary-600'>{userTable?.[0]?.total}점</div>
                  </div>
                </div>
              </div>
              <Link
                href={'/mypage'}
                className='flex justify-center items-center self-center text-center w-[5.875rem] h-[5.25rem] body-16 bg-primary-400 text-white rounded-[0.875rem]'
              >
                내정보 <br />
                보러가기
              </Link>
            </div>
          </div>
        </div>

        {/* <div>
            <div>닉네임 : {userTable?.[0].user.nickname}</div>
            <div>소개 : {userTable?.[0].user.introduction}</div>
            <div>나의 랭킹 : {userTable?.[0].ranking}</div>
            <div>
              {' '}
              {myLastrank ? <div>{`지난주 순위 : ${myLastrank?.[0]?.ranking}`}</div> : <div>지난주 순위 : </div>}
            </div>
            <div>주어진 문장읽기 : {userTable?.[0].speaking}</div>
            <div>빈칸 채우기 : {userTable?.[0].writing}</div>
            <div>틀린것 맞추기 : {userTable?.[0].checking}</div>
            <div>총합 점수 : {userTable?.[0].total}</div>
          </div> */}
      </div>
    );
  }
};

export default RankingPage;
