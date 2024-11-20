import Image from 'next/image';
import React from 'react';
import PercentGraph from './PercentGraph';
import Link from 'next/link';
import { UserRound } from 'lucide-react';
import { RankIncludingUserInfo, UserProfile } from '@/types/rank';

const MyInfoBox = ({
  userProfile,
  myRankingThisWeek,
  myRankPercentThisWeek,
  myRankingLastWeek,
  myRankPercentLastWeek,
}: {
  userProfile: UserProfile | null;
  myRankingThisWeek: RankIncludingUserInfo[] | undefined;
  myRankPercentThisWeek: string | undefined;
  myRankingLastWeek: number | undefined;
  myRankPercentLastWeek: string | undefined | null;
}) => {
  return (
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
              priority
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
  );
};

export default MyInfoBox;
