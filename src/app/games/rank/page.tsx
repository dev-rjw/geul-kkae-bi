import React from 'react';
import './style.css';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { UserRound } from 'lucide-react';
import { fetchUserId } from '@/utils/auth/server-action';
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

    if (!data || data.length === 0) {
      redirect('/');
    } else {
      //이번주 전체 등수 매기기
      countRankingThisWeek = data.map((item, index) => ({ ...item, ranking: index + 1 }));
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
              sizes='100%'
            />
          </div>
          이번주 전체 랭킹 순위
        </LineTitle>
      </div>
      <div className='scrollbar-primary flex flex-col h-[calc(100vh-8.5rem)] pt-8 pb-[9.375rem] rounded-[3.125rem] bg-primary-50 max-md:grow max-md:h-full max-md:px-4 max-md:py-6 max-md:rounded-t-[1.25rem] max-md:rounded-b-none'>
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
            <div className='relative w-[6.875rem] aspect-square rounded-[1.25rem] overflow-hidden max-md:w-[6.25rem] max-md:rounded-[0.313rem]'>
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
          <div className='flex grow gap-[1.875rem] h-full pl-6 max-md:flex-col max-md:gap-3 max-md:h-auto max-md:pl-3'>
            <div className='flex items-center grow gap-9 max-md:flex-col max-md:grow-0 max-md:gap-3'>
              <div className='flex flex-col items-center w-full max-w-[15.75rem] max-md:order-2 max-md:max-w-none'>
                <div className='flex max-md:hidden text-[1.375rem] font-yangjin mb-[0.375rem] text-primary-500'>
                  {userProfile?.nickname}
                </div>
                <div className='flex items-center justify-center w-full h-11 body-16 px-3 py-[0.625rem] bg-[#D9E8FF] text-primary-600 rounded-lg max-md:h-9 max-md:p-2 max-md:text-sm max-md:rounded-md'>
                  <span className='text-ellipsis whitespace-nowrap break-all overflow-hidden'>
                    {userProfile ? userProfile?.introduction : '한줄 소개가 없습니다.'}
                  </span>
                </div>
              </div>
              <div className='flex gap-[1.625rem] w-full title-20 max-md:max-w-none max-md:title-14 max-md:order-1'>
                <div className='flex flex-col items-center gap-5 max-md:flex-row max-md:flex-wrap max-md:gap-y-2 max-md:justify-between max-md:w-full'>
                  <div className='flex items-center h-8 max-md:h-auto'>
                    <div className='w-[6.75rem] text-primary-700 max-md:w-auto'>나의 랭킹</div>
                    <div className='w-12 text-right text-primary-400 max-md:w-11'>
                      {myRankingThisWeek?.[0]?.ranking}등
                    </div>
                  </div>
                  <div className='flex items-center h-8 max-md:h-auto'>
                    <div className='w-[6.75rem] text-primary-700 max-md:w-auto'>지난주 순위</div>
                    <div className='w-12 text-right text-primary-600 max-md:w-11'>
                      {myRankingLastWeek ? myRankingLastWeek : ''}등
                    </div>
                  </div>
                </div>
                <PercentGraph
                  thisWeek={myRankPercentThisWeek}
                  lastWeek={myRankPercentLastWeek}
                  className='max-md:hidden'
                />
              </div>
            </div>
            <Link
              href={'/mypage'}
              className='group flex flex-col gap-1 justify-center items-center self-center text-center w-[7.5rem] h-[5.25rem] body-16 bg-primary-400 text-white rounded-[0.875rem] transition-colors hover:bg-primary-600 hover:text-primary-400 group max-md:w-full max-md:h-12 max-md:rounded-md'
            >
              <div className='flex max-md:hidden items-center justify-center w-7 h-7 rounded-full bg-primary-200 text-primary-400 transition-colors group-hover:bg-primary-500'>
                <UserRound className='w-5 h-5' />
              </div>
              마이페이지
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
