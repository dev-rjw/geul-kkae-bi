import React from 'react';
import './style.css';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { fetchUserId } from '@/utils/auth/server-action';
import {
  fetchLastWeek,
  fetchLatestWeek,
  fetchLatestWeekData,
  fetchUserLastRank,
  insertLastRankingData,
} from '@/utils/rank/server-action';
import { fetchUserProfile } from '@/utils/user/server-action';
import LineTitle from '@/components/LineTitle';
import RankingTable from './_components/RankingTable';
import MyInfoBox from './_components/MyInfoBox';

const RankingPage = async () => {
  const [userId, latestWeekData] = await Promise.all([fetchUserId(), fetchLatestWeekData()]);

  if (!userId) {
    redirect('/');
  }

  const userProfile = await fetchUserProfile(userId);

  //이번주 랭킹 로직
  let myRankingThisWeek;
  let countRankingThisWeek;
  let myRankPercentThisWeek;

  if (latestWeekData) {
    const latestWeek = latestWeekData.week;

    const data = await fetchLatestWeek(latestWeek);

    if (!data || data.length === 0) {
      redirect('/');
    }

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
    <div className='container pt-10 pb-4 max-md:min-h-content max-md:flex max-md:flex-col max-md:px-0 max-md:pt-[14rem] max-md:pb-0'>
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
              sizes='2.75rem'
              priority
            />
          </div>
          이번주 전체 랭킹 순위
        </LineTitle>
      </div>
      <div className='scrollbar-primary flex flex-col h-[calc(100vh-8.5rem)] pt-8 pb-[9rem] rounded-[3.125rem] bg-primary-50 max-md:grow max-md:h-full max-md:px-4 max-md:py-6 max-md:rounded-t-[1.25rem] max-md:rounded-b-none'>
        <div className='max-md:hidden flex items-center justify-center gap-x-2'>
          <Image
            src='/icon_rank.svg'
            width={45}
            height={45}
            quality={85}
            alt='랭킹순위 옆 아이콘'
            priority
          />
          <h2 className='title-36 text-primary-400 mt-1 -mb-2'>이번주 전체 랭킹 순위</h2>
        </div>
        <RankingTable countRankingThisWeek={countRankingThisWeek} />
      </div>
      <MyInfoBox
        userProfile={userProfile}
        myRankingThisWeek={myRankingThisWeek}
        myRankingLastWeek={myRankingLastWeek}
        myRankPercentThisWeek={myRankPercentThisWeek}
        myRankPercentLastWeek={myRankPercentLastWeek}
      />
    </div>
  );
};

export default RankingPage;
