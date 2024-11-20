import { RankIncludingUserInfo } from '@/types/rank';
import Image from 'next/image';
import React from 'react';

const RankingTable = ({ countRankingThisWeek }: { countRankingThisWeek: RankIncludingUserInfo[] | undefined }) => {
  return (
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
                    priority
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
                    priority
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
                    priority
                  />
                </div>
              </div>
              <div className='flex gap-4 items-center max-md:flex-col max-md:gap-[0.625rem] max-md:items-start'>
                <div className='rank-nickname w-[8.875rem] title-20 max-md:text-xs max-md:w-full'>
                  {item.user.nickname}
                </div>
              </div>
            </div>
            <span className='rank-total body-32 max-md:text-xs max-md:font-semibold'>{item.total}점</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingTable;
