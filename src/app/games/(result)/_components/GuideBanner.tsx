import { Medal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const GuideBanner = ({
  isDone,
  remainingGamesCount,
}: {
  isDone: boolean | undefined;
  remainingGamesCount: number | undefined;
}) => {
  return (
    <div className='flex items-center h-[8.625rem] px-[3.75rem] mt-[0.625rem] rounded-[1.25rem] bg-[#F1EFED] max-lg:px-6 max-md:w-full max-md:h-auto max-md:px-4 max-md:py-[1.125rem] max-md:mt-0 max-md:rounded-none max-md:bg-secondary-50'>
      {isDone ? (
        <>
          <div className='flex max-md:hidden items-center justify-between gap-2 w-full'>
            <div className='relative aspect-[224/108] w-[14rem] max-md:w-[9.063rem]'>
              <Image
                src='/icon_direct_to_rank.svg'
                alt='랭킹보러가기 아이콘'
                fill
                sizes='14rem'
                priority
              />
            </div>
            <div className='flex flex-col items-center'>
              <div className='body-22 text-gray-500 max-md:text-xs'>게임을 모두 완료했으니</div>
              <div className='body-30 text-gray-700 max-md:text-base max-sm:break-keep'>
                <span className='text-warning-300'>종합 랭킹을 확인하러</span> 가볼 깨비!
              </div>
            </div>
            <Link
              className='flex justify-center items-center gap-3 min-w-[11rem] h-11 rounded-full border-2 body-18 border-gray-300 text-gray-400 transition-colors hover:bg-gray-200'
              href='/games/rank'
            >
              랭킹 보러가기
              <Medal />
            </Link>
          </div>

          <Link
            className='hidden max-md:flex items-center justify-between gap-2 w-full'
            href='/games/rank'
          >
            <div className='flex flex-col'>
              <div className='body-22 text-gray-500 max-md:text-xs'>게임을 모두 완료했으니</div>
              <div className='body-30 text-gray-700 max-md:text-base max-sm:break-keep'>
                <span className='text-warning-300'>종합 랭킹을 확인하러</span> 가볼 깨비!
              </div>
            </div>
            <div className='relative aspect-[224/108] w-[14rem] max-md:w-[9.063rem]'>
              <Image
                src='/icon_direct_to_rank.svg'
                alt='랭킹보러가기 아이콘'
                fill
                sizes='14rem'
                priority
              />
            </div>
          </Link>
        </>
      ) : (
        <div className='flex items-center justify-between gap-2 w-full'>
          <div>
            <div className='body-22 text-gray-500 max-md:text-xs'>종합 랭킹을 확인하려면</div>
            <div className='body-30 text-gray-700 max-md:text-base max-sm:break-keep'>
              나머지 게임 <span className='text-warning-300'>{remainingGamesCount === 1 ? '1개' : '2개'}</span>를{' '}
              <br className='hidden max-sm:block' />
              모두 플레이 해야해 깨비!
            </div>
          </div>
          <div className='relative aspect-[230/94] w-[14.375rem] max-md:w-[11.25rem]'>
            <Image
              src='/icon_guide_to_play.svg'
              alt='회원 게임플레이 안내 아이콘'
              fill
              sizes='14.375rem'
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideBanner;
