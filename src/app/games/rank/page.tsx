import React from 'react';
import { fetchUserId } from '@/utils/auth/server-action';
import Image from 'next/image';
import './style.css';
import Link from 'next/link';
import {
  fetchLastWeek,
  fetchLatestWeek,
  fetchLatestWeekData,
  fetchUserLastRank,
  insertLastRankingData,
} from '@/utils/rank/server-action';
import { fetchUserProfile } from '@/utils/user/server-action';
import PercentGraph from './_components/PercentGraph';
import LineTitle from '@/components/LineTitle';

const RankingPage = async () => {
  const userId = await fetchUserId();
  const latestWeekData = await fetchLatestWeekData();
  const userProfile = await fetchUserProfile(userId);

  //이번주 랭킹 로직
  let myRankingThisWeek;
  let countRankingThisWeek;
  let myRankPercentThisWeek;

  if (latestWeekData) {
    const latestWeek = latestWeekData.week;

    const data = await fetchLatestWeek(latestWeek);

    //이번주 전체 등수 매기기
    countRankingThisWeek = data?.map((item, index) => ({ ...item, ranking: index + 1 }));

    if (countRankingThisWeek) {
      //이번주 내 등수
      myRankingThisWeek = countRankingThisWeek?.filter((user) => user.user_id === userId);

      //내 등수 퍼센트 계산
      if (myRankingThisWeek && myRankingThisWeek.length > 0) {
        const myRank = myRankingThisWeek[0]?.ranking;
        const totalUsers = countRankingThisWeek?.length;

        myRankPercentThisWeek = ((1 - (myRank - 1) / (totalUsers - 1)) * 100).toFixed(2);
      }
    }
  }
  console.log('myRankPercentThisWeek', myRankPercentThisWeek);

  //지난주 랭킹 로직
  let myRankingLastWeek;
  let lastWeekData;
  let myRankPercentLastWeek;

  if (latestWeekData && latestWeekData.week - 1 > 0) {
    const lastWeek = latestWeekData.week - 1;

    lastWeekData = await fetchLastWeek(lastWeek);

    if (lastWeekData?.[0].ranking === null) {
      const countLastWeekRanking = lastWeekData?.map((item, index) => ({
        ...item,
        ranking: index + 1,
      }));

      if (countLastWeekRanking) {
        insertLastRankingData(countLastWeekRanking);
      }
    }
    const myRank = await fetchUserLastRank(userId, lastWeek);

    //내 등수 퍼센트 계산
    if (myRank && myRank.ranking !== null && lastWeekData) {
      myRankingLastWeek = myRank?.ranking;

      if (myRankingLastWeek !== undefined) {
        const totalUsers = lastWeekData.length;
        myRankPercentLastWeek = ((1 - (myRankingLastWeek - 1) / (totalUsers - 1)) * 100).toFixed(2);
      } else {
        myRankPercentLastWeek = null;
      }
    }
  }

  return (
    <div className='container pt-10 pb-4 max-md:px-0 max-md:pt-[14rem]'>
      <div className='hidden max-md:flex items-center justify-center mb-5'>
        <LineTitle
          className='text-primary-400 text-xl font-normal font-yangjin'
          lineClassName='bg-primary-100'
        >
          <div className='relative flex items-center w-[2.75rem] aspect-square mb-1 max-md:w-[1.5rem]'>
            <Image
              src='/icon_rank.svg'
              alt='랭킹순위 옆 아이콘'
              fill
              sizes='100%'
            />
          </div>
          이번주 전체 랭킹 순위
        </LineTitle>
      </div>
      <div
        className='scrollbar-primary flex flex-col pt-8 pb-[9.375rem] rounded-[3.125rem] bg-primary-50 max-md:!h-auto max-md:px-4 max-md:py-6 max-md:rounded-[1.25rem]'
        style={{ height: 'calc(100vh - 136px)' }}
      >
        <div className='max-md:hidden flex items-center justify-center gap-x-2'>
          <Image
            src='/icon_rank.svg'
            width={45}
            height={45}
            quality={85}
            alt='랭킹순위 옆 아이콘'
          />
          <h2 className='title-36 text-primary-400 mt-1 -mb-2'>이번주 전체 랭킹 순위</h2>
        </div>
        <div className='h-full mx-4 mt-7 overflow-x-hidden overflow-y-auto max-md:m-0'>
          <div className='grid gap-5 pl-[4.75rem] pr-[3.813rem] pb-5 max-lg:px-0 max-md:pb-0 max-md:gap-3'>
            {countRankingThisWeek?.slice(0, 3)?.map((item) => (
              <div
                key={item.id}
                className='top-rank flex items-center bg-[#98A7F1] w-full h-[6.25rem] px-8 py-2 mx-auto rounded-[1rem] max-lg:px-4 max-md:h-16 max-md:px-3 max-md:rounded-lg'
              >
                <div className='flex items-center gap-4'>
                  <div className='flex items-center'>
                    <div className='rank-ranking title-24 max-md:text-xl'>{item.ranking}등</div>
                    <div className='relative w-[4.875rem] aspect-square rounded-sm overflow-hidden max-md:rounded-md max-md:w-[3rem]'>
                      <Image
                        src={item.user.image}
                        alt='profile image for my ranking'
                        quality={85}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                  <div className='flex gap-4 items-center max-md:flex-col max-md:gap-[0.625rem] max-md:items-start'>
                    <div className='rank-nickname title-24 w-[11.25rem] max-md:text-base max-md:w-full'>
                      {item.user.nickname}
                    </div>
                    <p className=' grow title-24 text-white/60 -mb-1 max-md:text-xs'>{item.user.introduction}</p>
                  </div>
                </div>
                <span className='rank-total body-36 max-md:text-xl max-md:font-semibold'>{item.total}점</span>
              </div>
            ))}
            {countRankingThisWeek?.slice(3, 5)?.map((item) => (
              <div
                key={item.id}
                className='top-rank flex items-center bg-[#C5CDF7] w-full h-[4.75rem] px-8 py-[0.375rem] mx-auto rounded-[1rem] max-lg:px-4 max-md:h-11 max-md:px-3 max-md:rounded-lg'
              >
                <div className='flex items-center gap-4'>
                  <div className='flex items-center'>
                    <div className='rank-ranking title-20 max-md:text-base'>{item.ranking}등</div>
                    <div className='relative w-[3.875rem] aspect-square rounded-sm overflow-hidden max-md:rounded-md max-md:w-[2.25rem]'>
                      <Image
                        src={item.user.image}
                        alt='profile image for my ranking'
                        quality={85}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                  <div className='flex gap-4 items-center max-md:flex-col max-md:gap-[0.125rem] max-md:items-start'>
                    <div className='rank-nickname title-20 w-[8.875rem] max-md:text-sm max-md:w-full'>
                      {item.user.nickname}
                    </div>
                    <p className=' grow title-20 text-[#647BEE] -mb-1 max-md:text-xs'>{item.user.introduction}</p>
                  </div>
                </div>
                <span className='rank-total body-36 max-md:text-sm max-md:font-semibold'>{item.total}점</span>
              </div>
            ))}
            {countRankingThisWeek?.slice(5)?.map((item) => (
              <div
                key={item.id}
                className='top-rank flex items-center bg-[#C5CDF7] w-full h-[3.25rem] px-8 py-1 mx-auto rounded-[1rem] max-lg:px-4 max-md:h-8 max-md:px-3 max-md:rounded-lg'
              >
                <div className='flex items-center gap-4'>
                  <div className='flex items-center'>
                    <div className='rank-ranking title-20 max-md:text-xs'>{item.ranking}등</div>
                    <div className='relative w-[2.5rem] aspect-square rounded-sm overflow-hidden max-md:rounded-md max-md:w-[1.5rem]'>
                      <Image
                        src={item.user.image}
                        alt='profile image for my ranking'
                        quality={85}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                  <div className='flex gap-4 items-center max-md:flex-col max-md:gap-[0.625rem] max-md:items-start'>
                    <div className='rank-nickname w-[8.875rem] title-20 max-md:text-xs max-md:w-full'>
                      {item.user.nickname}
                    </div>
                    {/* <p className=' grow title-20 text-[#647BEE] -mb-1'>{item.user.introduction}</p> */}
                  </div>
                </div>
                <span className='rank-total body-32 max-md:text-xs max-md:font-semibold'>{item.total}점</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='rank-my-info'>
        <div className='rank-my-info-card'>
          <div>
            <div className='relative w-[6.875rem] aspect-square border border-primary-400 rounded-[1.25rem] overflow-hidden max-md:w-[6.25rem] max-md:rounded-sm'>
              <Image
                src={userProfile?.image ?? ''}
                alt='profile image for my ranking'
                quality={85}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className='hidden max-md:flex text-sm font-bold justify-center text-primary-400 mt-3'>
              {userProfile?.nickname}
            </div>
          </div>
          <div className='flex grow gap-[2.75rem] h-full pl-[2.125rem] max-md:flex-col max-md:gap-3 max-md:h-auto max-md:pl-3'>
            <div className='flex items-center grow gap-[2.75rem] max-md:flex-col max-md:grow-0 max-md:gap-3'>
              <div className='flex flex-col self-stretch w-full max-md:order-2'>
                <div className='flex max-md:hidden items-center justify-center body-16 mb-4 text-primary-400'>
                  {userProfile?.nickname}
                </div>
                <div className='flex items-center justify-center h-full caption-14 bg-primary-50 rounded-[0.875rem] max-md:p-2 max-md:rounded-md'>
                  {userProfile ? userProfile?.introduction : '한줄 소개가 없습니다.'}
                </div>
              </div>
              <div className='flex flex-col justify-between gap-4 w-full max-w-[12.813rem] title-20 max-md:flex-row max-md:max-w-none max-md:title-14 max-md:order-1'>
                <div className='flex items-center justify-between max-md:gap-[0.625rem]'>
                  <div className='text-primary-700'>나의 랭킹</div>
                  <div className='text-primary-400'>{myRankingThisWeek?.[0]?.ranking}등</div>
                </div>
                <div className='flex items-center justify-between max-md:gap-[0.625rem]'>
                  <div className='text-primary-700'>지난주 순위</div>
                  <div className='text-primary-600'>{myRankingLastWeek ? myRankingLastWeek : ''}등</div>
                </div>
              </div>
              <div className='w-[200px]'>
                <PercentGraph
                  thisWeek={myRankPercentThisWeek}
                  lastWeek={myRankPercentLastWeek}
                />
              </div>
            </div>
            <Link
              href={'/mypage'}
              className='flex justify-center items-center self-center text-center w-[5.875rem] h-[5.25rem] body-16 bg-primary-400 text-white rounded-[0.875rem] max-md:w-full max-md:h-12 max-md:rounded-md'
            >
              마이페이지 가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
