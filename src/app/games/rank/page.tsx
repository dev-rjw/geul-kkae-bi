import { createClient } from '@/utils/supabase/server';
import React from 'react';
import { Rank, RankIncludingUserInfo, UserProfile } from '@/types/rank';
import { fetchUserId } from '@/utils/auth/server-action';
import Image from 'next/image';
import './style.css';
import Link from 'next/link';
import { fetchLatestWeekData, insertLastRankingData } from '@/utils/rank/server-action';
import { redirect } from 'next/navigation';

const RankingPage = async () => {
  const serverClient = createClient();
  const userId = await fetchUserId();
  const latestWeekData = await fetchLatestWeekData();

  const { data: userProfile }: { data: UserProfile | null } = await serverClient
    .from('user')
    .select()
    .eq('user_id', userId)
    .single();

  //이번주 랭킹 로직
  let userTable;
  let countRanking;

  if (latestWeekData) {
    const latestWeek = latestWeekData.week;

    const { data }: { data: RankIncludingUserInfo[] | null } = await serverClient
      .from('rank')
      .select(`*,user(nickname, introduction, image)`)
      .eq('week', latestWeek)
      .gte('total', 0)
      .order('total', { ascending: false });

    if (!data || data.length === 0) {
      redirect('/');
    } else {
      //이번주 전체 등수
      countRanking = data.map((item, index) => ({ ...item, ranking: index + 1 }));
      //이번주 내 등수
      userTable = countRanking?.filter((user) => user.user_id === userId);
    }
  }

  //지난주 랭킹 로직
  if (latestWeekData && latestWeekData.week - 1 > 0) {
    const lastWeek = latestWeekData.week - 1;

    const { data: lastWeekData } = await serverClient
      .from('rank')
      .select()
      .eq('week', lastWeek)
      .not('total', 'is', null)
      .order('total', { ascending: false });

    if (lastWeekData?.[0].ranking === null) {
      const countRanking: Rank[] | undefined = lastWeekData?.map((item, index) => ({
        ...item,
        ranking: index + 1,
      }));

      if (countRanking) {
        insertLastRankingData(countRanking);
      }
    }

    const { data: myLastrank }: { data: Rank | null } = await serverClient
      .from('rank')
      .select()
      .eq('user_id', userId)
      .eq('week', lastWeek)
      .single();

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
                src={userProfile?.image ?? ''}
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
                    {userProfile?.nickname}
                  </div>
                  <div className='flex items-center justify-center h-full caption-14 bg-primary-50 rounded-[0.875rem]'>
                    {userProfile ? userProfile?.introduction : '한줄 소개가 없습니다.'}
                  </div>
                </div>
                <div className='flex flex-col justify-between gap-4 w-full max-w-[12.813rem] title-20'>
                  <div className='flex items-center justify-between'>
                    <div className='text-primary-700'>나의 랭킹</div>
                    <div className='text-primary-400'>{userTable?.[0]?.ranking}등</div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='text-primary-700'>지난주 순위</div>
                    <div className='text-primary-600'>{myLastrank ? myLastrank?.ranking : ''}등</div>
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
      </div>
    );
  }
};

export default RankingPage;
