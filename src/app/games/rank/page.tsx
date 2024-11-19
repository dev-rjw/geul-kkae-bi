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
import { redirect } from 'next/navigation';
import { fetchUserProfile } from '@/utils/user/server-action';
import PercentGraph from './_components/PercentGraph';
import Swal from 'sweetalert2';

const alert = async () => {
  Swal.fire({
    html: '<div>시간이 다 됐다 깨비!<br>다음에 다시 도전하라 깨비</div>',
    confirmButtonText: '확인',
    customClass: {
      title: 'swal-custom-title',
      htmlContainer: 'swal-custom-text',
      confirmButton: 'swal-custom-button',
    },
  });
};

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

    console.log('data', data);

    if (!data || data.length === 0) {
      redirect('/?redirectFrom=Rank');
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
            {countRankingThisWeek?.slice(0, 3)?.map((item) => (
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
            {countRankingThisWeek?.slice(3, 5)?.map((item) => (
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
                  <strong className='title-20 w-[8.875rem] text-primary-700 -mb-1'>{item.user.nickname}</strong>
                  <p className=' grow title-20 text-[#647BEE] -mb-1'>{item.user.introduction}</p>
                </div>
                <span className='body-36 ml-auto text-primary-700'>{item.total}점</span>
              </div>
            ))}
            {countRankingThisWeek?.slice(5)?.map((item) => (
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
                  <strong className='title-20 w-[8.875rem] text-primary-700 -mb-1'>{item.user.nickname}</strong>
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
                  <div className='text-primary-400'>{myRankingThisWeek?.[0]?.ranking}등</div>
                </div>
                <div className='flex items-center justify-between'>
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
};

export default RankingPage;
